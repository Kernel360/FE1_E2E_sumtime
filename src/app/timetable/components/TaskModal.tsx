// import Modal from './Modal';
import styled from './TaskModal.module.scss';

interface TaskModalProps {
  // isOpen: boolean;
  // close: VoidFunction;
  title: string;
  description: string;
}

function TaskModal({ title, description }: TaskModalProps) {
  return (
    // <Modal isOpen={isOpen} close={close}>
    <div className={styled.container}>
      <div>{title}</div>
      <div>{description}</div>
    </div>
    // </Modal>
  );
}

export default TaskModal;
