import style from '@/css/Tracker.module.css'
import {Add, Delete} from '@mui/icons-material'
import {
  Table,
  TableBody,
  TableCell,
 TableContainer,
  TableHead,
  TableRow,
  Paper, 
  IconButton, 
  Button
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import {supabase} from '@/utils/supabase.js'

export default function Tracker(){

    const [id, setId] = useState(0)
    const [entry, setEntry] = useState([])
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
        setEntry(prev=>[...prev, {debt_id:incrementedId, payment: 0, date:new Date().toLocaleDateString('en-CA')}])
        
        
    }

    const showModal = () =>{

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
                        console.log('Successfully Updated: ', data)
                    }else {
                        console.error('Error: ', error)
                    }
                    
                }
            }
            handleData(entry)
    }

    const deleteRow = (index) =>{
        
        

        async function deleteData(entry) {
            const {data, error} = await supabase.from('debt_tracker').delete().eq('debt_id', entry[index].debt_id).select()

            if(error){
                console.error('Error: ', error)
            } 
            else{
                console.log('Successfully Deleted: ', data)
                setEntry((prev)=>{
                const updated = [...prev]
                updated.splice(index,1)
                return updated
                } )
            }            
        }
        deleteData(entry)
        
    }

    useEffect(()=>{
        async function loadData() {
            const {data, error} = await supabase.from('debt_tracker').select('debt_id, name, payment,date, notes')

            setEntry(data)
            setId(data[data.length-1].debt_id)


            if(error)console.error ('Error: ',error)
                else console.log('Successfully Loaded: ', data)
        }
        loadData()
    },[])
        
        

    return(
        <div className='flex flex-col gap-2'>
            <TableContainer component={Paper}>
               <Table>
                    <TableHead>
                        <TableRow>
                        
                        <TableCell align="center" ><span className='font-bold font-mono'>Name</span></TableCell>
                        <TableCell align="center"><span className='font-bold font-mono'>Payment</span></TableCell>
                        <TableCell align="center"><span className='font-bold font-mono'>Date</span></TableCell>
                        <TableCell align="center"><span className='font-bold font-mono'>Notes</span></TableCell>
                        <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entry.map((item, index)=>(
                            <TableRow key={index}>
                                
                                <TableCell align="center">
                                    <input type="text" onChange={event=>setEntry(prev=>prev.map((item,i)=> i===index ? {...item, name :event.target.value}:item))} 
                                onBlur={()=>insertOrUpdate()} className={style.input} value={item.name}/>
                                </TableCell>
                                <TableCell align="center">
                                    <input type="text" onChange={event=>setEntry(prev=>prev.map((item,i)=> i===index ? {...item, payment :(!isNaN(event.target.value)?(Number(event.target.value)):'')}:item))}
                                      onBlur={()=>insertOrUpdate()} className={style.input} value={item.payment}/>
                                </TableCell>
                                <TableCell align="center">
                                    <input type="date" onChange={event=>setEntry(prev=>prev.map((item,i)=> i===index ? {...item, date :event.target.value}:item))}
                                      onBlur={()=>insertOrUpdate()} className={style.input} value={item.date} />
                                </TableCell>
                                <TableCell align="center">
                                    <input type="text" onChange={event=>setEntry(prev=>prev.map((item,i)=> i===index ? {...item, notes :event.target.value}:item))}
                                      onBlur={()=>insertOrUpdate()} className={style.input} value={item.notes} />
                                </TableCell>
                                <TableCell align="center">
                                    <Delete onClick={()=>deleteRow(index)} color='error'/>
                                </TableCell>
                            </TableRow>
                        ))
                            }
                        
                    </TableBody>
                    
                </Table>
                
                <div className='flex justify-center items-center'>
                    <TableCell>
                        <div className='flex flex-col gap-2 items-center w-full'>
                            <IconButton><Add onClick={addRow}/></IconButton>
                            <Button variant='contained' color='primary' onClick={showModal}>Pay ₱{total} through Gcash</Button>

                        </div>
                        
                    </TableCell>
                    
                </div>
            
            </TableContainer>

            <div className='bg-white p-10 fixed top-14'>
                <img src="/gcash-qr.jpg" className='w-1/3' alt="" />
                <span>Or send the money to me </span>
            </div>
            
            
            
            
        </div>
        
)   
}