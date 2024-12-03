/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

interface Props {
   startDate?: Date
   endDate?: Date
   setStartDate?: (date: Date) => void
   setEndDate?: (date: Date) => void
}

const DateLeadsSelect = ({ startDate, endDate, setStartDate, setEndDate }: Props) => {

   return (
   <div className='flex items-center gap-3'>
   <Popover>
      <PopoverTrigger asChild>
         <Button
            variant={'outline'}
            className={cn(
               'w-[150px] justify-start text-left font-normal',
               !startDate && 'text-muted-foreground',
            )}>
            <CalendarIcon />
            {startDate ? format(startDate, 'dd.MM.yyyy') : <span>Выберите дату</span>}
         </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
         <Calendar
            mode='single'
            selected={startDate}
            // @ts-ignore                     
            onSelect={setStartDate}
            initialFocus
         />
      </PopoverContent>
   </Popover>   

   <Popover>
      <PopoverTrigger asChild>
         <Button
            variant={'outline'}
            className={cn(
               'w-[150px] justify-start text-left font-normal',
               !endDate && 'text-muted-foreground',
            )}>
            <CalendarIcon />
            {endDate ? format(endDate, 'dd.MM.yyyy') : <span>Выберите дату</span>}
         </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
         <Calendar
            mode='single'
            selected={endDate}               
            // @ts-ignore
            onSelect={setEndDate}
            initialFocus
         />
      </PopoverContent>
   </Popover>
</div>
  )
}

export default DateLeadsSelect