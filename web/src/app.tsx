import { CreateGoal } from './components/createGoal'
import { EmptyGoals } from './components/emptyGoals'
import { Summary } from './components/summary'
import { Dialog } from './components/ui/dialog'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from './http/getSummary'

type SummaryResponse = {
  completed: number
  total: number
  goalsPerDay: Record<
      string, 
      {
        id: string;
        title: string;
        createdAt: string;
      }[]
      >
}

export function App() {

  const { data } = useQuery<SummaryResponse>({

    queryKey: ['summary'],

    queryFn: getSummary,
    
    staleTime: 1000 * 60,

  })



  return (
    <Dialog>

      {data?.total && data.total > 0 ? <Summary/> : <EmptyGoals/>}

      <CreateGoal/>  
      
    </Dialog>
  )
}