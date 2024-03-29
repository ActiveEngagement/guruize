import fs from 'fs';
import yaml from 'js-yaml';
import fileTree from './file_tree.js'
import getBoardsFor from './boards.js';
import getCardsFor from './cards.js';
import buildBoardsYaml from './build_boards_yaml.js';
import buildCardsYaml from './build_cards_yaml.js';

export default async function (options) {
    const tree = await fileTree(options.sourceDir);

    const boards = getBoardsFor(tree);
    const boardsYaml = buildBoardsYaml(boards);
    await fs.promises.writeFile(options.boardsFile, boardsYaml);

    const cards = getCardsFor(tree);
    const cardsYaml = buildCardsYaml(cards);
    await fs.promises.writeFile(options.cardsFile, cardsYaml);

    const collection = { Tags: {} };
    await fs.promises.writeFile(options.collectionFile, yaml.dump(collection));
}