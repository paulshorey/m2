import axios from 'axios';

const defaultSystemMessage = `Extract repeating text from the prompt. Wrap repeating text items in quotes. Comma separate each item. Ignore HTML tags and attributes in the prompt content. Find repeating patterns and extract any repeating text into a tuple array, or key/value pairs. To find repeating text, consider the length of each phrase and what it means.

Format the response as JSON array or object. Return only the JSON code. Remove whitespace. Do not wrap in backticks.

Example 1. For the following input,
    Authentication and authorization
    Spiral maintains strict role-based access control across all our internal and external systems. Access to all critical services requires SSO and multi-factor authentication.
    External audits
    Spiral conducts an independent audit of policies and procedures, including: Information Security Policy, Third-Party Risk Management Policy, Business Continuity Policy, Incident Response Policy, and End-User Data and Privacy Policy.
    Risk assessment
    Spiral conducts regular risk assessments to gain an accurate and thorough understanding of the potential risks to security, availability, and privacy in our products and services.
the expected response is:
    [
        [ "Authentication and authorization", "Spiral maintains strict role-based access control across all our internal and external systems. Access to all critical services requires SSO and multi-factor authentication." ],
        [ "External audits", "Spiral conducts an independent audit of policies and procedures, including: Information Security Policy, Third-Party Risk Management Policy, Business Continuity Policy, Incident Response Policy, and End-User Data and Privacy Policy." ],
        [ "Risk assessment", "Spiral conducts regular risk assessments to gain an accurate and thorough understanding of the potential risks to security, availability, and privacy in our products and services." ]
    ]

Example 2. For the following input,
    <tr><td class="gtld-name text-primary"><a href="https://www.godaddy.com/tlds/ac-domain">ac</a></td><td class="gtld-comments hidden-md-down">Now available for registration</td><td class="gtld-action"><a class="ux-button ux-button-primary ux-button-small" href="https://www.godaddy.com/tlds/ac-domain" value="2967"><span class="ux-button-text">Register Now</span></a></td></tr>
    <tr><td class="gtld-name text-primary"><a href="https://www.godaddy.com/tlds/academy-domain">academy</a></td><td class="gtld-comments hidden-md-down">Now available for registration</td><td class="gtld-action"><a class="ux-button ux-button-primary ux-button-small" href="https://www.godaddy.com/tlds/academy-domain" value="1531"><span class="ux-button-text">Register Now</span></a></td></tr>
    <tr><td class="gtld-name text-primary"><a href="https://www.godaddy.com/tlds/accountant-domain">accountant</a></td><td class="gtld-comments hidden-md-down">Now available for registration</td><td class="gtld-action"><a class="ux-button ux-button-primary ux-button-small" href="https://www.godaddy.com/tlds/accountant-domain" value="1533"><span class="ux-button-text">Register Now</span></a></td></tr>
the expected response is:
    [
        [ "ac", "Now available for registration", "Register Now" ],
        [ "academy", "Now available for registration", "Register Now" ],
        [ "accountant", "Now available for registration", "Register Now" ]
    ]

Example 3. For the following input,
    HBO Max, This May, HBO Max becomes Max., Apr 12, Find out what that means for you. Max Introducing Max Hey Paul, We've been dying to tell you the good news!

    selected, unread, Zatista, Your Weekly, Personalized Art Picks [Zatista], 7:17 AM, VISIT ZATISTA.COM arrow1 icon-pinterest icon-facebook icon-twitter Zatista sales@zatista.com | 877.282.7566 

    starred, unread, KC Urban Potters, April Shop Update, Apr 11, April Shop Update at KC Urban Potters                                                      .KC Urban PottersApril Shop Update-April Shop Update at KC Urban Potters                                                      Apr 11
the expected response is:
    [
        {
          "title": "HBO Max",
          "subtitle": "This May, HBO Max becomes Max."
          "description": "Find out what that means for you. Max Introducing Max Hey Paul, We've been dying to tell you the good news!",
          "date": "Apr 12",
        },
        {
          "starred": true,
          "unread": true,
          "title": "Zatista",
          "subtitle": "Your Weekly, Personalized Art Picks [Zatista]",
          "description": "VISIT ZATISTA.COM arrow1 icon-pinterest icon-facebook icon-twitter Zatista",
          "date": "7:17 AM",
        },
        {
          "starred": true,
          "unread": true,
          "title": "KC Urban Potters",
          "subtitle": "April Shop Update",
          "description": "April Shop Update at KC Urban Potters.KC Urban PottersApril Shop Update-April Shop Update at KC Urban Potters",
          "date": "Apr 11",
        }
    ]
`;
// Reply with ONLY the JSON code and nothing else.
// Do not include any text or anything else! Do not include instructions or advice.
// Do not wrap the response in backticks or any other formatting.`;

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
        // model: 'gpt-4',
        model: 'gpt-3.5-turbo',
        // model: 'text-davinci-edit-001',
        messages: [
          {
            role: 'system',
            content: defaultSystemMessage,
          },
          {
            role: 'user',
            content: req.body.userMessage,
          },
        ],
        // input: req.body.userMessage,
        // instruction: defaultSystemMessage,
        // temperature: req.body.temperature,
        // top_p: req.body.top_p,
        // n: req.body.n,
        // presence_penalty: req.body.presence_penalty,
        // frequency_penalty: req.body.frequency_penalty,
      };
      const apiURL = 'https://api.openai.com/v1/chat/completions';
      const response = await axios.post(apiURL, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_SECRET}`,
        },
      });
      // console.log('response.data', response.data);

      // "edit" endpoint
      // const assistantMessageContent = response.data.choices[0].text;
      // "chat completion" endpoint
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
