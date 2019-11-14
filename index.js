/**
 * Toy data analysis problem using cows :)
 *
 * I used to maintain herd records in yaml text files. Each cow had 1 file. This
 * is based on the ancient tradition of dairy farmers keeping records on 'cowcards'.
 * The challenge with this approach is that every summary report requires reading
 * each file. Since IO can get expensive, I thought it might be a good example
 * to use for promises and asyncronous programming. While it might be better if
 * the files were e.g. on a remote server, I think the pattern holds.
 *
 * The toy example I used was to summarize the number of cows in my herd by their
 * current reproductive state (pregnant, open, bred). The example uses explicit
 * promise construction, async/await, an IIFE and lots of higher order functions.
 *
 */

yaml = require('js-yaml');
fs = require('fs');
path = require('path');

const cowPath = path.join(__dirname, 'cows');

/**
 * List all the cowcards.
 */
const listCowCards = () => {
  const output = [];
  fs.readdirSync(cowPath).forEach(f => {
    output.push(path.join(cowPath, f));
  });

  return output;
};

/**
 * Syncronously read a single cowcard.
 *
 * @param fname {str}: The name of the cowcard file.
 * @returns {Object}: An object with the data for that cow.
 */
const readCowCard = (fname) => {
  try {
    const data = yaml.safeLoad(fs.readFileSync(fname), 'utf-8');
    return data;
  } catch (err) {
    return err;
  }
};


/**
 * Asyncronously read a cowcard by returning a promise.
 *
 * @param fname {str}: The name of the cowcard file.
 * @returns {Promise}: A promise that will resolve to the data object.
 */
const readCowCardAsync = (fname) => {
  try {
    return new Promise((resolve, reject) => {
      resolve(readCowCard(fname));
    });
  } catch (err) {
    return err;
  }
};

// =========================== Main Script  ================================

const cowfiles = listCowCards();

(async () => {
  try {
    const mapped = await Promise.all(cowfiles.map(f => readCowCardAsync(f)));

    const cowsByRepro = mapped.reduce((acc, cur) => {
      acc[cur.repro_state]++; 
      return acc;
    }, {open: 0, preg: 0, bred: 0});

    console.log('Cows by Reproductive State:');
    console.log(cowsByRepro);

  } catch (err) {
    console.error(err);
  }
})();



