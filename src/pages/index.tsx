import { useState } from 'react';
import { Inter } from 'next/font/google'
import type { NextPageContext } from 'next'
import Dropdown from '@/components/Dropdown/dropdown';
import DataTable from '@/components/DataTable/datatable';
import PlayerWidget from '@/components/PlayerWidget/playerwidget';
import PlayerImage from '@/assets/tom_brady.png';
import _ from 'lodash';

interface Options{
  selectedValue: string,
  options: Array<any>
}

interface Player {
  Name: string;
  Team: string;
  Position: string;
  Salary: string;
  Points: number;
}

const inter = Inter({ subsets: ['latin'] })

const tableColumns = ['Name', 'Team', 'Position', 'Salary', 'Points'];


export default function Home(props: {players: any, operators: any}) {
  
  const [operatorList, setOperatorList] = useState({
    selectedValue: '',
    options: props?.operators
  })

  const [gameTypes, setGameTypes] = useState<Options>({
    selectedValue: '',
    options: []
  });
  const [slateNames, setSlateNames] = useState<Options>({
    selectedValue: '',
    options: []
  });

  const [selectedPlayer, setSelectedPlayer] = useState<Player|any>({});

  const [playerList, setPlayerList] = useState<Array<Player>>(props.players);

  const onSelectHandler = async (name:string, value: string) => {
    if(name == "operators" && value){
      const { data } = await (await fetch(window.location.origin + `/api/${value}`)).json() as any;
      const transformData = 
      data?.map(({operatorGameType}: any) => 
      ({label: operatorGameType,
        value: operatorGameType}));
      setOperatorList((previous) => ({
        ...previous,
        selectedValue: value
      }))
      setGameTypes((previous) => ({
        ...previous,
        options: transformData
      }))
    }
    else if(name == 'gameTypes' && operatorList.selectedValue && value){
      const { data } = await (await fetch(window.location.origin + `/api/${operatorList.selectedValue}/${value}`)).json() as any;
      const {data: players} = await (await fetch(window.location.origin + `/api/players`, {
        method: 'POST',
        body: JSON.stringify({
          operator: operatorList.selectedValue, 
          gameType: value
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        })
      })).json() as any;
      const transformData = 
      data?.map(({operatorName}: any) => 
      ({label: operatorName,
        value: operatorName}));
      setGameTypes((previous) => ({
        ...previous,
        selectedValue: value
      }))
      setPlayerList(players);
      setSelectedPlayer(players[0]);
      setSlateNames((previous) => ({
        ...previous,
        options: transformData
      }))
    }
    else if(name == "slateNames" && operatorList.selectedValue && gameTypes.selectedValue && value){
      const {data} = await (await fetch(window.location.origin + `/api/players`, {
        method: 'POST',
        body: JSON.stringify({
          operator: operatorList.selectedValue, 
          gameType: gameTypes.selectedValue, 
          slateName: value
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        })
      })).json() as any;
      setSlateNames((previous) => ({
        ...previous,
        selectedValue: value
      }))
      setPlayerList(data);
      setSelectedPlayer(data[0]);
    }
  }

  const onSelectPlayer = (row: any) => setSelectedPlayer(row);


  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className='flex flex-row items-center p-[20px] gap-[20px] bg-darkVariantTwo'>
        <Dropdown placeholder='Select Operator' options={operatorList.options} onSelect={(value) => onSelectHandler('operators', value)}/>
        <Dropdown placeholder='Select Game Type' options={gameTypes.options} onSelect={(value) => onSelectHandler('gameTypes', value)}/>
        <Dropdown placeholder='Select Slate Name' options={slateNames.options} onSelect={(value) => onSelectHandler('slateNames', value)}/>
      </div>
      <div className='mt-[4rem] grid grid-cols-6 gap-4 w-full'>
          <div className='col-span-4'>
            <DataTable 
              columns={tableColumns}
              data={playerList}
              itemsPerPage={10}
              onSelectRow={onSelectPlayer}
              selectedRow={selectedPlayer}
              selectKey='Name'
              />
          </div>
          <div className='col-span-2'>
            <PlayerWidget 
              playerImage={PlayerImage}
              playerName={selectedPlayer?.Name}
              playerPoints={selectedPlayer?.Points}/>
          </div>
      </div>
    </main>
  )
}

export const getServerSideProps = async (context: NextPageContext) => {
  const fetchPlayers = (await fetch(`http://${context.req?.headers.host}/api/players`)).json();
  const fetchOperators = (await fetch(`http://${context.req?.headers.host}/api/operatorlist`)).json();

  const responses = await Promise.all([fetchPlayers, fetchOperators]);

  let operators = responses[1]?.data?.map((data: any) => ({
    label: data.operator,
    value: data.operator
  }))

  operators = _.uniqBy(operators, (data: any) => data.label);
  
  return { props: { 
    players: responses[0]?.data,
    operators
   }}
}
