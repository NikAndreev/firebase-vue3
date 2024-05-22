export const http = async (url: string, config: object) => {
  const res = await fetch(url, config);

  if (!res.ok) {
    throw new Error(`Ошибка: ${res.status}`);
  }

  const data = await res.json();

  return data;
};
