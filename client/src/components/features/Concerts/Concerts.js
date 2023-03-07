import ConcertSearch from '../ConcertSearch/ConcertSearch';
import Concert from './../Concert/Concert';

const Concerts = ({ concerts }) => (
  <section>
    <ConcertSearch />
    {concerts.map(con => <Concert key={con.id} {...con} />)}
  </section>
);

export default Concerts;