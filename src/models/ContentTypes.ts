import { Contents } from "./Contents.js";
import type { ContentsAttributes, ContentsCreationAttributes } from "./Contents.js";

/*
enum ConditionStates {
	EXCELLENT,
	MINT,
	REFURBISHED,
	LIKE-NEW,
	SLIGHTLY-USED,
	FAIRLY-USED,
	HEAVILYY-USED,
	SLIGHTLY-DAMAGED,
	HEAVILY-DAMAGED,
	POOR,
	MISSING-PARTS
}
type Conditions = keyof typeof ConditionStates;

interface gameAttributes {
	condition: Conditions;
}

interface bookAttributes {
	condition: Conditions;
}
*/

export interface IProductAttributes extends ContentsAttributes {
    coverImage?: string;
}

export interface IBookAttributes extends ContentsAttributes {
    author?: string;
    isbn?: string;
    excerpt?: string;
    coverImage?: string;
}

export interface IGameAttributes extends ContentsAttributes {
    designers?: object;
    graphics?: object;
    description?: string;
    coverImage?: string;
}

export class Products extends Contents implements IProductAttributes {
  constructor() {
    super();
  }
}

export class Books extends Contents implements IBookAttributes {
  constructor() {
    super();
  }
}

export class Games extends Contents implements IGameAttributes {
  constructor() {
    super();
  }
}

