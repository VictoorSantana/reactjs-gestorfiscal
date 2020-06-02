


const localtema = localStorage.getItem('tema');
export default require('./' + (localtema !== null ? (localtema + '.scss') : ('Orgamec.scss')) ).default;