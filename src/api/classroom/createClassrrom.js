import baseURL from 'src/config/config';

export default async function createClassroom(requestData) {
  const response = await fetch(`${baseURL}/classroom`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });
  const data = await response.json();

  return data;
}
