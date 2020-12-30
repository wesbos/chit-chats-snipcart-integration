import data from '@begin/data';

export async function handler(req: object) {
  const person = await data.set({
    table: 'people',
    name: 'Scott',
    age: Math.floor(Math.random() * 100),
  });

  const people = await data.get({
    table: 'people',
    limit: 100,
    begin: 'Scott',
  });

  return {
    headers: {
      'content-type': 'text/html; charset=utf8',
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
    },
    statusCode: 200,
    body: JSON.stringify(people),
  };
}
