import './MainPage.css';
import ProfilePicture from '../assets/profile.jpg';
import TaskList from '../components/TaskList/TaskList';
function MainPage() {
  return (
    <div>
      <img className='profile-pic' src={ProfilePicture} alt='Profile Picture' />
        <TaskList />
        
    </div>
  );
}

export default MainPage;