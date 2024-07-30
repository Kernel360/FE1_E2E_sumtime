import styled from './Timetable.module.scss';

interface TimetableProps {
  startTime: Date;
  endTime: Date;
  slotTime: number;
  height: string;
  timetableType: 'CURCLE' | 'ROW' | 'COLUMN';
  displayCurrentTime: boolean;
  taskList: Task[];
}

interface Task {
  id: number;
  title: string;
  subTitle: string;
  slotColor: string;
  startTime: Date;
  endTime: Date;
}

function Timetable({
  startTime,
  endTime,
  slotTime,
  height,
  timetableType,
  displayCurrentTime,
  taskList,
}: TimetableProps) {
  console.log('taskList', taskList);
  console.log('timetableType', timetableType);
  console.log('displayCurrentTime', displayCurrentTime);
  console.log('height', height);
  console.log('slotTime', slotTime);
  console.log('endTime', endTime);
  console.log('startTime', startTime);

  return (
    <div>
      <div className={styled.container}>
        <h1>Timetable</h1>
      </div>
      <div>
        <div>slot이 될 녀석</div>
        {/* props => headerDate, soltTime, 필더링 된 taskitem?가 넘어올 예정. */}
        <div>slot이 될 녀석</div>
        <div>slot이 될 녀석</div>
      </div>
      {/* <div>
        {taskList.map(task => (
          <div key={task.id}>
            <p>{task.title}</p>
            <p>{task.subTitle}</p>
            <p>{task.slotColor}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Timetable;

// <Timetable
//   startTime={data}
//   endTime={data}
//   slotTime={30}
//   height="800px"
//   timetableType="COLUMN"
//   displayCurrentTime
//   taskList={taskList}
// />;
