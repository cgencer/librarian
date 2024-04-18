export type TEnvironment = "dev" | "prod";
export type TSecScriptSrc = "dev" | "prod";
export type TPolicyType = "contentSecurities" | "referrers";
export type TDirective = "scriptSrc" | "styleSrc" | "fontSrc" | "connectSrc" | "defaultSrc";

export interface IConfig
{
    environment: TEnvironment;
	jwt_secret: string;
	port: number;
	db_url: string;
	db_uri: string;
	logs?: boolean;
	content_security?: boolean;
	referrers?: boolean;
}
//TODO: type-enforcing on nested Interface trough Partials needs to be done carefully.
/*
export interface IContentSecurities
{
	defaultSrc: string | string[];
	scriptSrc: string | string[];
	styleSrc: string | string[];
	fontSrc: string | string[];
	connectSrc: string | string[];
}

export interface IPolicies
{
	contentSecurities?: Partial<IContentSecurities>; 
	referrers?: string | string[];
}
*/
// https://grrr.tech/posts/2021/typescript-partial/
export type Subset<K> = {
    [attr in keyof K]?: K[attr] extends object
        ? Subset<K[attr]>
        : K[attr] extends object | null
        ? Subset<K[attr]> | null
        : K[attr] extends object | null | undefined
        ? Subset<K[attr]> | null | undefined
        : K[attr];
};

//export type TUnionDirectives = Record<Directive, string | Array<string>;

export type TPolicy = Partial<{
    [key in TDirective]: string | string[];
}>;

