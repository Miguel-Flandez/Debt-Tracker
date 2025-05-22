import style from '@/css/Tracker.module.css'
import {IconButton} from '@mui/material'
import { AiOutlinePlus } from 'react-icons/ai';
import {
  Table,
  TableBody,
  TableCell,
 TableContainer,
  TableHead,
  TableRow,
  Paper, 
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import {supabase} from '@/utils/supabase.js'

export default function Tracker(){

    const [id, setId] = useState(1)
    const [entry, setEntry] = useState([{debt_id:id}])
    const total = useMemo(()=>{
        let acc = 0;
        entry.forEach(item=>{
            acc+=item.payment
        })
        return acc;
    },[entry])

    const addRow = () =>{

        const incrementedId = id+1;

        setId(incrementedId)

        setEntry(prev=>[...prev, {debt_id:incrementedId}])
        
        
    }



    const insertOrUpdate = () =>{
        async function handleData(entry) {
                    for (const item of entry) {
                        const {data, error} = await supabase.from('debt_tracker').select('debt_id').eq('debt_id', item.debt_id)

                    if(!data.length){
                        await supabase.from('debt_tracker').insert([item]).select()
                        console.log('Successfully Added: ', data)
                    
                    }else if(data.length===1){
                        await supabase.from('debt_tracker').update(item).eq('debt_id', item.debt_id)
                    }else {
                        console.error('Error: ', error)
                    }
                    
                }
            }
            handleData(entry)
            console.log(entry)
    }

    useEffect(()=>{
        insertOrUpdate();
    }, [entry])

    // useEffect(()=>{
    //     async function readData() {
    //         const {data, error} = await supabase.from('debt_tracker').select('name, payment, notes')

    //         setEntry(data)

    //         if(error)console.error ('Error: ',error)
    //             else console.log('it worked I guess ', data)
    //     }
    //     readData()
    // },[])
        
        

    return(
        <div className='flex flex-col gap-2'>
            <TableContainer component={Paper}>
               <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center" ><span className='font-bold font-mono'>Name</span></TableCell>
                        <TableCell align="center"><span className='font-bold font-mono'>Payment</span></TableCell>
                        <TableCell align="center"><span className='font-bold font-mono'>Notes</span></TableCell>
                        
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entry.map((item, index)=>(
                            <TableRow key={index}>
                                <TableCell align="center">
                                    <input type="checkbox" />
                                </TableCell>
                                <TableCell align="center">
                                    <input type="text" onBlur={event=>setEntry(prev=>prev.map((item,i)=> i===index ? {...item, name :event.target.value}:item))} 
                                className={style.input} value={item.name}/>
                                </TableCell>
                                <TableCell align="center">
                                    <input type="text" onBlur={event=>setEntry(prev=>prev.map((item,i)=> i===index ? {...item, payment :Number(event.target.value)}:item))}
                                      className={style.input} value={item.payment}/>
                                </TableCell>
                                <TableCell align="center">
                                    <input type="text" onBlur={event=>setEntry(prev=>prev.map((item,i)=> i===index ? {...item, notes :event.target.value}:item))}
                                      className={style.input} value={item.notes} />
                                </TableCell>
                            </TableRow>
                        ))
                            }
                        <TableRow>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center"><span className='font-bold font-mono'>TOTAL AMOUNT : {total}</span></TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">
                                <IconButton onClick={addRow}><AiOutlinePlus/></IconButton>
                            </TableCell>
                            <TableCell align="center"></TableCell>
                            
                        </TableRow>
                    </TableBody>
                </Table>

                
            
            </TableContainer>
            
            
        </div>
        
)   
}