import css from './Home.module.css';
import { MdOutlineContactPhone } from 'react-icons/md';

export const Home = () => {
  return (
    <div className={css.containerHome}>
      <span>
        <MdOutlineContactPhone className={css.iconContactPhone} />
      </span>
      <h1 className={css.titleHome}>WELCOME TO "MY PHONEBOOK"</h1>
    </div>
  );
};
