import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface List {
  request: string;
  response: string;
}

const Playground: React.FC = () => {
  const [prompt, setPrompt] = useState("");

  const empty: List[] = [];
  const [list, setList] = useState(empty);

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const data = {
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
      },
      body: JSON.stringify(data),
    })
      .then((response: Response) => {
        return response.json();
      })
      .then((data) => {
        const response = data.choices[0].text;
        setList([{ request: prompt, response: response }, ...list]);
        setPrompt("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="enter a prompt..."
        />
        <Button type="submit">beep boop</Button>
      </Form>
      {list.map((item: List) => (
        <p>
          {item.request}
          <br />
          {item.response}
        </p>
      ))}
    </>
  );
};

export default Playground;
