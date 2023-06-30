// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'public');
  //Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');
  //Return the content of the data file in json format
  const parsedJSON = JSON.parse(fileContents);
  const operators = parsedJSON.map((data: any) => ({
    operator: data.operator,
    operatorGameType: data.operatorGameType,
    operatorName: data.operatorName,
    // dfsSlatePlayers: data.dfsSlatePlayers
  }))
  res.status(200).json({
    data: operators
  });
}

// "operator": "DraftKings", (select operator)
// "operatorGameType": "Snake", (select game type)
// "operatorName": "Main", (select slate name)

