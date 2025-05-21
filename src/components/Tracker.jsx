import style from '@/css/Tracker.module.css'
import { AiOutlinePlus } from 'react-icons/ai';
import {
  Table,
  TableBody,
  TableCell,
 TableContainer,
  TableHead,
  TableRow,
  Paper, 
  Button
} from '@mui/material';

export default function Tracker(){
    return(
        <div className='flex flex-col gap-2'>
            <TableContainer component={Paper}>
               <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell align="center" >Name</TableCell>
                        <TableCell align="center" sx={{ verticalAlign: 'middle' }}>Payment</TableCell>
                        <TableCell align="center" sx={{ verticalAlign: 'middle' }}>Notes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                        <TableCell align="center" sx={{ verticalAlign: 'middle' }}>
                            <input type="text" className={style.input} />
                        </TableCell>
                        <TableCell align="center" sx={{ verticalAlign: 'middle' }}>
                            <input type="text" className={style.input} />
                        </TableCell>
                        <TableCell align="center" sx={{ verticalAlign: 'middle' }}>
                            <input type="text" className={style.input} />
                        </TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell align="center" sx={{ verticalAlign: 'middle' }}></TableCell>
                        <TableCell align="center" sx={{ verticalAlign: 'middle' }}>123</TableCell>
                        <TableCell align="center" sx={{ verticalAlign: 'middle' }}></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                
            
            </TableContainer>
            <div className='w-full flex justify-center'>
                <Button variant="contained" startIcon={<AiOutlinePlus/>}>Add Entry</Button>
            </div>
            
        </div>
        
)   
}