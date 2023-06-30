import React, { useState } from 'react';
import LeftArrow from '@/assets/akar-icons_chevron-left.svg';
import RightArrow from '@/assets/akar-icons_chevron-right.svg';
import Dropdown from '@/components/Dropdown/dropdown';
import Image from 'next/image';

interface Row {
  [key: string]: any;
}

interface DataTableProps {
  columns: string[];
  data: Row[];
  itemsPerPage?: number;
  selectedRow?: any;
  selectKey?: string;
  onSelectRow?: (row: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({ columns = [], data = [], itemsPerPage = 10, selectedRow = null, selectKey = "", onSelectRow = () => {} }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState({
    selectedValue: 10,
    options: [
      {label: 5, value: 5},
      {label: 10, value: 10},
      {label: 50, value: 50}
    ]
  })

  const totalPages = Math.ceil(data?.length / rowsPerPage.selectedValue);

  const indexOfLastItem = currentPage * rowsPerPage.selectedValue;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage.selectedValue;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const pageOptions = 
  Array.from({length: totalPages}, (_, i) => i+1)
  .slice(0,10)
  .map((val) => ({
    label: val,
    value: val
  }))

  const onRowClick = (rowData: any) => {
    onSelectRow(rowData);
  }

  return (
    <div>
      <table className='w-full'>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th className={`min-w-[120px] bg-darkVariantOne p-2 font-light leading-normal text-base text-white/[0.9] ${index == 0 ? 'text-left' : 'text-center'}`} key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, rowIndex) => (
            <tr onClick={() => onRowClick(row)} key={rowIndex} className={`${selectedRow?.[selectKey] == row?.[selectKey] ? 'bg-highlight' : 'bg-darkVariantTwo' }  hover:bg-highlight`}>
              {columns.map((column, columnIndex) => (
                <td className={`min-w-[120px] p-2 font-light leading-normal text-base text-white/[0.9] ${columnIndex == 0 ? 'text-left' : 'text-center'}`} key={columnIndex}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex flex-row justify-between items-center bg-darkVariantTwo p-2 text-sm'>
        <div className='flex flex-row items-center gap-2'>
            <span>Page</span>
            <Dropdown placeholder='' onSelect={(value) => handlePageChange(value as any)} options={pageOptions}/>
        </div>
        <div className='flex flex-row items-center gap-2'>
            <span>Rows per page</span>
            <Dropdown placeholder='' onSelect={(value) => {
              setRowsPerPage((previous) => ({
                ...previous,
                selectedValue: value as any
              }))
            }} options={rowsPerPage.options}/>
        </div>
        <div className='flex flex-row items-center gap-2'>
            <span>{currentPage}</span>
            <span>-</span>
            <span>{rowsPerPage.selectedValue}</span>
            <span>of</span>
            <span>{totalPages}</span>
        </div>
        <div className='flex flex-row items-center gap-2'>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                <Image src={LeftArrow} alt='?'/>
            </button>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                <Image src={RightArrow} alt='?'/>
            </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
