import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const jsonDirectory = path.join(process.cwd(), 'public');
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');
  const parsedJSON = JSON.parse(fileContents);

  if (req.method === 'POST') {
  const body = req.body as {operator: string, gameType: string, slateName: string};
  
  const filteredData = parsedJSON.filter((data: any) => 
  (data.operator == body.operator &&
  data.operatorGameType == body.gameType) && 
  ((body.slateName && data.operatorName == body.slateName) ||
  !body.slateName));
  const response = filteredData.reduce((acc: any, cur: any) => {
    acc = [...acc, ...cur?.dfsSlatePlayers];
    return acc;
  }, []);
  const data = response?.map((data: any) => ({
    Name: data?.operatorPlayerName ?? "",
    Team: data?.team ?? "",
    Position: data?.operatorPosition ?? "",
    Salary: data?.operatorSalary ?? "0",
    Points: data?.fantasyPoints ?? 0
  }))
  res.status(200).json({
    data
  });
}
else if(req.method == 'GET'){
    const response = parsedJSON.reduce((acc: any, cur: any) => {
      acc = [...acc, ...cur?.dfsSlatePlayers];
      return acc;
    }, []);
    const data = response?.map((data: any) => ({
      Name: data?.operatorPlayerName ?? "",
      Team: data?.team ?? "",
      Position: data?.operatorPosition ?? "",
      Salary: data?.operatorSalary ?? "0",
      Points: data?.fantasyPoints ?? 0
    }))
    res.status(200).json({
    data
    });
}
else{
    res.status(405).json({ message: 'Method Not Allowed' });
}
}

// "operator": "DraftKings", (select operator)
// "operatorGameType": "Snake", (select game type)
// "operatorName": "Main", (select slate name)