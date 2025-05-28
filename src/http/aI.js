import { $AI } from "./index";
export const fetcher = async (prompt) => {
    const model = 'gemma3';
    const stream = false; 
    const { data } = await fetch('http://localhost:7869/api/generate/' , {prompt, model, stream});
    return data;
}

export const ByeBye = async(prompt, model, stream) => {
    try {
        const model = 'gemma3';
        const stream = false; 
        const system = `Ты ассистент для сайта Виртуальный Деканат вуза МГТУ “Станкин”. Ты должен отвечать на вопросы, которые касаются вуза, например где расположен МГТУ “СТАНКИН” и прочее.`
      const response = await fetch('http://localhost:7869/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            prompt: prompt, 
            model: model, 
            stream: stream,
            system: system
        })
      });
  
      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка:', error);
      throw error;
    }
  }