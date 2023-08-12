import axios from 'axios';
// import cconsole from '@techytools/cc';
//
export default async function handler(req, res) {
  if (req.method === 'POST') {
    if (!req.body.userMessage) {
      res.status(400).json({
        message: 'Error: No message provided.',
      });
      return;
    }

    try {
      const data = {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content:
              req.body.systemMessage ||
              'Do not describe, paraphrase, or mention the question. Answer with only the content directly relevant to the prompt, and any supporting details, facts, numbers, documentation, references, citations, or related content. Do not include text for the purpose of politeness, political correctness, or protecting the reader from potentially harmful information contained in the reply. Always reply using markdown syntax. Use markdown syntax for every line and paragraph. To show programming code or technical content with special characters or where whitespace matters, wrap that content in triple backticks (```). To add a bulletted list, prepend each list item with a dash and space (- ). To make a quote, or emphasize some text, prepend the content with a greater than sign and space (> ). To add a link, use [link text](link url). If a line of text is a title, and there is only one or two such types of content, use H2 (##). If the title occurs several times, use H3 (###). If a line of text is a short topic sentence, use H4 (####).',
          },
          {
            role: 'user',
            content: req.body.userMessage,
          },
        ],
        temperature: req.body.temperature,
        top_p: req.body.top_p,
        n: req.body.n,
        presence_penalty: req.body.presence_penalty,
        frequency_penalty: req.body.frequency_penalty,
      };
      const apiURL = 'https://api.openai.com/v1/chat/completions';
      const response = await axios.post(apiURL, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_SECRET}`,
        },
      });
      const assistantMessageContent = response.data.choices[0].message.content;

      res.status(200).json({
        message: assistantMessageContent,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error making POST request to OpenAI.',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
