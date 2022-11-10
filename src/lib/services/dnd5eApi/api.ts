/// <reference path="./custom.d.ts" />
// tslint:disable
/**
 * D&D 5e API
 * # Introduction  Welcome to the dnd5eapi, the Dungeons & Dragons 5th Edition API! This documentation should help you familiarize yourself with the resources available and how to consume them with HTTP requests. Read through the getting started section before you dive in. Most of your problems should be solved just by reading through it.  ## Getting Started  Let's make our first API request to the D&D 5th Edition API!  Open up a terminal and use [curl](http://curl.haxx.se/) or [httpie](http://httpie.org/) to make an API request for a resource. You can also scroll through the definitions below and send requests directly from the endpoint documentation!  For example, if you paste and run this `curl` command: ```bash curl -X GET \"https://www.dnd5eapi.co/api/ability-scores/cha\" -H \"Accept: application/json\" ```  We should see a result containing details about the Charisma ability score: ```bash {   \"index\": \"cha\",   \"name\": \"CHA\",   \"full_name\": \"Charisma\",   \"desc\": [     \"Charisma measures your ability to interact effectively with others. It       includes such factors as confidence and eloquence, and it can represent       a charming or commanding personality.\",     \"A Charisma check might arise when you try to influence or entertain       others, when you try to make an impression or tell a convincing lie,       or when you are navigating a tricky social situation. The Deception,       Intimidation, Performance, and Persuasion skills reflect aptitude in       certain kinds of Charisma checks.\"   ],   \"skills\": [     {       \"name\": \"Deception\",       \"index\": \"deception\",       \"url\": \"/api/skills/deception\"     },     {       \"name\": \"Intimidation\",       \"index\": \"intimidation\",       \"url\": \"/api/skills/intimidation\"     },     {       \"name\": \"Performance\",       \"index\": \"performance\",       \"url\": \"/api/skills/performance\"     },     {       \"name\": \"Persuasion\",       \"index\": \"persuasion\",       \"url\": \"/api/skills/persuasion\"     }   ],   \"url\": \"/api/ability-scores/cha\" } ```  ## Authentication  The dnd5eapi is a completely open API. No authentication is required to query and get data. This also means that we've limited what you can do to just `GET`-ing the data. If you find a mistake in the data, feel free to [message us](https://discord.gg/TQuYTv7).  ## GraphQL  This API supports [GraphQL](https://graphql.org/). The GraphQL URL for this API is `https://www.dnd5eapi.co/graphql`. Most of your questions regarding the GraphQL schema can be answered by querying the endpoint with the Apollo sandbox explorer.  ## Schemas  Definitions of all schemas will be accessible in a future update. Two of the most common schemas are described here.  ### `APIReference` Represents a minimal representation of a resource. The detailed representation of the referenced resource can be retrieved by making a request to the referenced `URL`. ``` APIReference {   index     string   name      string   url       string } ``` <hr>  ### `DC` Represents a difficulty check. ``` DC {   dc_type       APIReference   dc_value      number   success_type  \"none\" | \"half\" | \"other\" } ``` <hr>  ### `Damage` Represents damage. ``` Damage {   damage_type     APIReference   damage_dice     string } ``` <hr>  ### `Choice` Represents a choice made by a player. Commonly seen related to decisions made during character creation or combat (e.g.: the description of the cleric class, under **Proficiencies**, states \"Skills: Choose two from History, Insight, Medicine, Persuasion, and Religion\" [[SRD p15]](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=15)) ``` Choice {   desc      string   choose    number   type      string   from      OptionSet } ``` <hr>  ### `OptionSet` The OptionSet structure provides the options to be chosen from, or sufficient data to fetch and interpret the options. All OptionSets have an `option_set_type` attribute that indicates the structure of the object that contains the options. The possible values are `options_array`, `equipment_category`, and `reference_list`. Other attributes on the OptionSet depend on the value of this attribute. - `options_array`   - `options` (array): An array of Option objects. Each item in the array represents an option that can be chosen. - `equipment_category`   - `equipment_category` (APIReference): A reference to an EquipmentCategory. Each item in the EquipmentCategory's `equipment` array represents one option that can be chosen. - `resource_list`   - `resource_list_url` (string): A reference (by URL) to a collection in the database. The URL may include query parameters. Each item in the resulting ResourceList's `results` array represents one option that can be chosen. <hr>  ### `Option` When the options are given in an `options_array`, each item in the array inherits from the Option structure. All Options have an `option_type` attribute that indicates the structure of the option. The value of this attribute indicates how the option should be handled, and each type has different attributes. The possible values and their corresponding attributes are listed below. - `reference` - A terminal option. Contains a reference to a Document that can be added to the list of options chosen.   - `item` (APIReference): A reference to the chosen item. - `action` - A terminal option. Contains information describing an action, for use within Multiattack actions.   - `action_name` (string): The name of the action, according to its `name` attribute.   - `count` (number | string): The number of times this action can be repeated if this option is chosen.   - `type` (string = `\"melee\" | \"ranged\" | \"ability\" | \"magic\"`, optional): For attack actions that can be either melee, ranged, abilities, or magic. - `multiple` - When this option is chosen, all of its child options are chosen, and must be resolved the same way as a normal option.   - `items` (array): An array of Option objects. All of them must be taken if the option is chosen. - `choice` - A nested choice. If this option is chosen, the Choice structure contained within must be resolved like a normal Choice structure, and the results are the chosen options.   - `choice` (Choice): The Choice to resolve. - `string` - A terminal option. Contains a reference to a string.   - `string` (string): The string. - `ideal` - A terminal option. Contains information about an ideal.   - `desc` (string): A description of the ideal.   - `alignments` (ApiReference[]): A list of alignments of those who might follow the ideal. - `counted_reference` - A terminal option. Contains a reference to something else in the API along with a count.   - `count` (number): Count.   - `of` (ApiReference): Thing being referenced. - `score_prerequisite` - A terminal option. Contains a reference to an ability score and a minimum score.   - `ability_score` (ApiReference): Ability score being referenced.   - `minimum_score` (number): The minimum score required to satisfy the prerequisite. - `ability_bonus` - A terminal option. Contains a reference to an ability score and a bonus   - `ability_score` (ApiReference): Ability score being referenced   - `bonus` (number): The bonus being applied to the ability score - `breath` - A terminal option: Contains a reference to information about a breath attack.   - `name` (string): Name of the breath.   - `dc` (DC): Difficulty check of the breath attack.   - `damage` ([Damage]): Damage dealt by the breath attack, if any. - `damage` - A terminal option. Contains information about damage.   - `damage_type` (ApiReference): Reference to type of damage.   - `damage_dice` (string): Damage expressed in dice (e.g. \"13d6\").   - `notes` (string): Information regarding the damage.  ## FAQ  ### What is the SRD? The SRD, or Systems Reference Document, contains guidelines for publishing content under the OGL. This allows for some of the data for D&D 5e to be open source. The API only covers data that can be found in the SRD. [Here's a link to the full text of the SRD.](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf)  ### What is the OGL? The Open Game License (OGL) is a public copyright license by Wizards of the Coast that may be used by tabletop role-playing game developers to grant permission to modify, copy, and redistribute some of the content designed for their games, notably game mechanics. However, they must share-alike copies and derivative works. [More information about the OGL can be found here.](https://en.wikipedia.org/wiki/Open_Game_License)  ### A monster, spell, subclass, etc. is missing from the API / Database. Can I add it? Please check if the data is within the SRD. If it is, feel free to open an issue or PR to add it yourself. Otherwise, due to legal reasons, we cannot add it.  ### Can this API be self hosted? Yes it can! You can also host the data yourself if you don't want to use the API at all. You can also make changes and add extra data if you like. However, it is up to you to merge in new changes to the data and API.  #### Can I publish is on <insert platform>? Is this free use? Yes, you can. The API itself is under the [MIT license](https://opensource.org/licenses/MIT), and the underlying data accessible via the API is supported under the SRD and OGL.  # Status Page  The status page for the API can be found here: https://5e-bits.github.io/dnd-uptime/  # Chat  Come hang out with us [on Discord](https://discord.gg/TQuYTv7)!  # Contribute  This API is built from two repositories.   - The repo containing the data lives here: https://github.com/bagelbits/5e-database   - The repo with the API implementation lives here: https://github.com/bagelbits/5e-srd-api  This is a evolving API and having fresh ideas are always welcome! You can open an issue in either repo, open a PR for changes, or just discuss with other users in this discord.
 *
 * OpenAPI spec version: 0.1
 *
 *
 * NOTE: This file is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the file manually.
 */

import * as url from 'url';
import { parse } from 'url';
const isomorphicFetch = fetch;
import { Configuration } from './configuration';

const BASE_PATH = 'https://www.dnd5eapi.co'.replace(/\/+$/, '');

/**
 *
 * @export
 */
export const COLLECTION_FORMATS = {
	csv: ',',
	ssv: ' ',
	tsv: '\t',
	pipes: '|'
};

/**
 *
 * @export
 * @interface FetchAPI
 */
export interface FetchAPI {
	(url: string, init?: any): Promise<Response>;
}

/**
 *
 * @export
 * @interface FetchArgs
 */
export interface FetchArgs {
	url: string;
	options: any;
}

/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
	protected configuration: Configuration;

	constructor(
		configuration?: Configuration,
		protected basePath: string = BASE_PATH,
		protected fetch: FetchAPI = isomorphicFetch
	) {
		if (configuration) {
			this.configuration = configuration;
			this.basePath = configuration.basePath || this.basePath;
		}
	}
}

/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
	name: 'RequiredError';
	constructor(public field: string, msg?: string) {
		super(msg);
	}
}

/**
 * `APIReference`
 * @export
 * @interface APIReference
 */
export interface APIReference {
	/**
	 * Resource index for shorthand searching.
	 * @type {string}
	 * @memberof APIReference
	 */
	index?: string;
	/**
	 * Name of the referenced resource.
	 * @type {string}
	 * @memberof APIReference
	 */
	name?: string;
	/**
	 * URL of the referenced resource.
	 * @type {string}
	 * @memberof APIReference
	 */
	url?: string;
}
/**
 * `APIReferenceList`
 * @export
 * @interface APIReferenceList
 */
export interface APIReferenceList {
	/**
	 * Total number of resources available.
	 * @type {number}
	 * @memberof APIReferenceList
	 */
	count?: number;
	/**
	 *
	 * @type {Array<APIReference>}
	 * @memberof APIReferenceList
	 */
	results?: Array<APIReference>;
}
/**
 *
 * @export
 * @interface AbilityBonus
 */
export interface AbilityBonus {
	/**
	 * Bonus amount for this ability score.
	 * @type {number}
	 * @memberof AbilityBonus
	 */
	bonus?: number;
	/**
	 *
	 * @type {APIReference}
	 * @memberof AbilityBonus
	 */
	abilityScore?: APIReference;
}
/**
 * `AbilityScore`
 * @export
 * @interface AbilityScore
 */
export interface AbilityScore extends APIReference {
	/**
	 * Description of the resource.
	 * @type {Array<string>}
	 * @memberof AbilityScore
	 */
	desc?: Array<string>;
	/**
	 * Full name of the ability score.
	 * @type {string}
	 * @memberof AbilityScore
	 */
	fullName?: string;
	/**
	 * List of skills that use this ability score.
	 * @type {Array<APIReference>}
	 * @memberof AbilityScore
	 */
	skills?: Array<APIReference>;
}
/**
 * `Alignment`
 * @export
 * @interface Alignment
 */
export interface Alignment extends APIReference {
	/**
	 * Brief description of the resource.
	 * @type {string}
	 * @memberof Alignment
	 */
	desc?: string;
	/**
	 * Abbreviation/initials/acronym for the alignment.
	 * @type {string}
	 * @memberof Alignment
	 */
	abbreviation?: string;
}
/**
 *
 * @export
 * @interface AreaOfEffect
 */
export interface AreaOfEffect {
	/**
	 *
	 * @type {number}
	 * @memberof AreaOfEffect
	 */
	size?: number;
	/**
	 *
	 * @type {string}
	 * @memberof AreaOfEffect
	 */
	type?: AreaOfEffect.TypeEnum;
}

/**
 * @export
 * @namespace AreaOfEffect
 */
export namespace AreaOfEffect {
	/**
	 * @export
	 * @enum {string}
	 */
	export enum TypeEnum {
		Sphere = <any>'sphere',
		Cone = <any>'cone',
		Cylinder = <any>'cylinder',
		Line = <any>'line',
		Cone_4 = <any>'cone'
	}
}
/**
 * `Armor`
 * @export
 * @interface Armor
 */
export interface Armor extends APIReference {
	/**
	 * Description of the resource.
	 * @type {Array<string>}
	 * @memberof Armor
	 */
	desc?: Array<string>;
	/**
	 *
	 * @type {APIReference}
	 * @memberof Armor
	 */
	equipmentCategory?: APIReference;
	/**
	 * The category of armor this falls into.
	 * @type {string}
	 * @memberof Armor
	 */
	armorCategory?: string;
	/**
	 * Details on how to calculate armor class.
	 * @type {{ [key: string]: string; }}
	 * @memberof Armor
	 */
	armorClass?: { [key: string]: string };
	/**
	 * Minimum STR required to use this armor.
	 * @type {number}
	 * @memberof Armor
	 */
	strMinimum?: number;
	/**
	 * Whether the armor gives disadvantage for Stealth.
	 * @type {boolean}
	 * @memberof Armor
	 */
	stealthDisadvantage?: boolean;
	/**
	 *
	 * @type {Cost}
	 * @memberof Armor
	 */
	cost?: Cost;
	/**
	 * How much the equipment weighs.
	 * @type {number}
	 * @memberof Armor
	 */
	weight?: number;
}
/**
 * `Background`
 * @export
 * @interface Background
 */
export interface Background extends APIReference {
	/**
	 * Starting proficiencies for all new characters of this background.
	 * @type {Array<APIReference>}
	 * @memberof Background
	 */
	startingProficiencies?: Array<APIReference>;
	/**
	 * Starting equipment for all new characters of this background.
	 * @type {Array<APIReference>}
	 * @memberof Background
	 */
	startingEquipment?: Array<APIReference>;
	/**
	 *
	 * @type {Choice}
	 * @memberof Background
	 */
	startingEquipmentOptions?: Choice;
	/**
	 *
	 * @type {Choice}
	 * @memberof Background
	 */
	languageOptions?: Choice;
	/**
	 *
	 * @type {BackgroundFeature}
	 * @memberof Background
	 */
	feature?: BackgroundFeature;
	/**
	 * Choice of personality traits for this background.
	 * @type {any}
	 * @memberof Background
	 */
	personalityTraits?: any;
	/**
	 *
	 * @type {Choice}
	 * @memberof Background
	 */
	ideals?: Choice;
	/**
	 *
	 * @type {Choice}
	 * @memberof Background
	 */
	bonds?: Choice;
	/**
	 *
	 * @type {Choice}
	 * @memberof Background
	 */
	flaws?: Choice;
}
/**
 * Special feature granted to new characters of this background.
 * @export
 * @interface BackgroundFeature
 */
export interface BackgroundFeature {
	/**
	 *
	 * @type {string}
	 * @memberof BackgroundFeature
	 */
	name?: string;
	/**
	 *
	 * @type {Array<string>}
	 * @memberof BackgroundFeature
	 */
	desc?: Array<string>;
}
/**
 * `Choice`
 * @export
 * @interface Choice
 */
export interface Choice {
	/**
	 * Description of the choice to be made.
	 * @type {string}
	 * @memberof Choice
	 */
	desc?: string;
	/**
	 * Number of items to pick from the list.
	 * @type {number}
	 * @memberof Choice
	 */
	choose?: number;
	/**
	 * Type of the resources to choose from.
	 * @type {string}
	 * @memberof Choice
	 */
	type?: string;
	/**
	 *
	 * @type {OptionSet}
	 * @memberof Choice
	 */
	from?: OptionSet;
}
/**
 * `ClassLevel`
 * @export
 * @interface ClassLevel
 */
export interface ClassLevel {
	/**
	 * Resource index for shorthand searching.
	 * @type {string}
	 * @memberof ClassLevel
	 */
	index?: string;
	/**
	 * URL of the referenced resource.
	 * @type {string}
	 * @memberof ClassLevel
	 */
	url?: string;
	/**
	 * The number value for the current level object.
	 * @type {number}
	 * @memberof ClassLevel
	 */
	level?: number;
	/**
	 * Total number of ability score bonuses gained, added from previous levels.
	 * @type {number}
	 * @memberof ClassLevel
	 */
	abilityScoreBonuses?: number;
	/**
	 * Proficiency bonus for this class at the specified level.
	 * @type {number}
	 * @memberof ClassLevel
	 */
	profBonus?: number;
	/**
	 * Features automatically gained at this level.
	 * @type {Array<APIReference>}
	 * @memberof ClassLevel
	 */
	features?: Array<APIReference>;
	/**
	 *
	 * @type {SubclassLevelSpellcasting}
	 * @memberof ClassLevel
	 */
	spellcasting?: SubclassLevelSpellcasting;
	/**
	 * Class specific information such as dice values for bard songs and number of warlock invocations.
	 * @type {any}
	 * @memberof ClassLevel
	 */
	classSpecific?: any;
}
/**
 *
 * @export
 * @interface ClassStartingEquipment
 */
export interface ClassStartingEquipment {
	/**
	 *
	 * @type {number}
	 * @memberof ClassStartingEquipment
	 */
	quantity?: number;
	/**
	 *
	 * @type {APIReference}
	 * @memberof ClassStartingEquipment
	 */
	equipment?: APIReference;
}
/**
 * `Condition`
 * @export
 * @interface Condition
 */
export interface Condition extends APIReference {
	/**
	 * Description of the resource.
	 * @type {Array<string>}
	 * @memberof Condition
	 */
	desc?: Array<string>;
}
/**
 * `Cost`
 * @export
 * @interface Cost
 */
export interface Cost {
	/**
	 * Numerical amount of coins.
	 * @type {number}
	 * @memberof Cost
	 */
	quantity?: number;
	/**
	 * Unit of coinage.
	 * @type {string}
	 * @memberof Cost
	 */
	unit?: string;
}
/**
 * `DC`
 * @export
 * @interface DC
 */
export interface DC {
	/**
	 *
	 * @type {APIReference}
	 * @memberof DC
	 */
	dcType?: APIReference;
	/**
	 * Value to beat
	 * @type {number}
	 * @memberof DC
	 */
	dcValue?: number;
	/**
	 * Result of a successful save. Can be \\\"none\\\", \\\"half\\\", or \\\"other\\\"
	 * @type {string}
	 * @memberof DC
	 */
	successType?: string;
}
/**
 * `Damage`
 * @export
 * @interface Damage
 */
export interface Damage {
	/**
	 *
	 * @type {string}
	 * @memberof Damage
	 */
	damageDice?: string;
	/**
	 *
	 * @type {APIReference}
	 * @memberof Damage
	 */
	damageType?: APIReference;
}
/**
 * `DamageType`
 * @export
 * @interface DamageType
 */
export interface DamageType extends APIReference {
	/**
	 * Description of the resource.
	 * @type {Array<string>}
	 * @memberof DamageType
	 */
	desc?: Array<string>;
}
/**
 * `Equipment`
 * @export
 * @interface Equipment
 */
export interface Equipment {}
/**
 * `EquipmentCategory`
 * @export
 * @interface EquipmentCategory
 */
export interface EquipmentCategory extends APIReference {
	/**
	 * A list of the equipment that falls into this category.
	 * @type {Array<APIReference>}
	 * @memberof EquipmentCategory
	 */
	equipment?: Array<APIReference>;
}
/**
 * `EquipmentPack`
 * @export
 * @interface EquipmentPack
 */
export interface EquipmentPack extends APIReference {
	/**
	 * Description of the resource.
	 * @type {Array<string>}
	 * @memberof EquipmentPack
	 */
	desc?: Array<string>;
	/**
	 *
	 * @type {APIReference}
	 * @memberof EquipmentPack
	 */
	equipmentCategory?: APIReference;
	/**
	 *
	 * @type {APIReference}
	 * @memberof EquipmentPack
	 */
	gearCategory?: APIReference;
	/**
	 *
	 * @type {Cost}
	 * @memberof EquipmentPack
	 */
	cost?: Cost;
	/**
	 * The list of adventuring gear in the pack.
	 * @type {Array<APIReference>}
	 * @memberof EquipmentPack
	 */
	contents?: Array<APIReference>;
}
/**
 *
 * @export
 * @interface ErrorResponse
 */
export interface ErrorResponse {
	/**
	 *
	 * @type {string}
	 * @memberof ErrorResponse
	 */
	error: string;
}
/**
 * `Feat`
 * @export
 * @interface Feat
 */
export interface Feat extends APIReference {
	/**
	 * Description of the resource.
	 * @type {Array<string>}
	 * @memberof Feat
	 */
	desc?: Array<string>;
	/**
	 * An object of APIReferences to ability scores and minimum scores.
	 * @type {Array<Prerequisite>}
	 * @memberof Feat
	 */
	prerequisites?: Array<Prerequisite>;
}
/**
 * `Feature`
 * @export
 * @interface Feature
 */
export interface Feature extends APIReference {
	/**
	 * Description of the resource.
	 * @type {Array<string>}
	 * @memberof Feature
	 */
	desc?: Array<string>;
	/**
	 * The level this feature is gained.
	 * @type {number}
	 * @memberof Feature
	 */
	level?: number;
	/**
	 *
	 * @type {APIReference}
	 * @memberof Feature
	 */
	_class?: APIReference;
	/**
	 *
	 * @type {APIReference}
	 * @memberof Feature
	 */
	subclass?: APIReference;
	/**
	 * Information specific to this feature.
	 * @type {{ [key: string]: any; }}
	 * @memberof Feature
	 */
	featureSpecific?: { [key: string]: any };
}
/**
 * `Gear`
 * @export
 * @interface Gear
 */
export interface Gear extends APIReference {
	/**
	 * Description of the resource.
	 * @type {Array<string>}
	 * @memberof Gear
	 */
	desc?: Array<string>;
	/**
	 *
	 * @type {APIReference}
	 * @memberof Gear
	 */
	equipmentCategory?: APIReference;
	/**
	 *
	 * @type {APIReference}
	 * @memberof Gear
	 */
	gearCategory?: APIReference;
	/**
	 *
	 * @type {Cost}
	 * @memberof Gear
	 */
	cost?: Cost;
	/**
	 * How much the equipment weighs.
	 * @type {number}
	 * @memberof Gear
	 */
	weight?: number;
}
/**
 * `Language`
 * @export
 * @interface Language
 */
export interface Language extends APIReference {
	/**
	 * Brief description of the language.
	 * @type {string}
	 * @memberof Language
	 */
	desc?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Language
	 */
	type?: Language.TypeEnum;
	/**
	 * Script used for writing in the language.
	 * @type {string}
	 * @memberof Language
	 */
	script?: string;
	/**
	 * List of races that tend to speak the language.
	 * @type {Array<string>}
	 * @memberof Language
	 */
	typicalSpeakers?: Array<string>;
}

/**
 * @export
 * @namespace Language
 */
export namespace Language {
	/**
	 * @export
	 * @enum {string}
	 */
	export enum TypeEnum {
		Standard = <any>'Standard',
		Exotic = <any>'Exotic'
	}
}
/**
 * `MagicItem`
 * @export
 * @interface MagicItem
 */
export interface MagicItem extends APIReference {
	/**
	 * Description of the resource.
	 * @type {Array<string>}
	 * @memberof MagicItem
	 */
	desc?: Array<string>;
	/**
	 *
	 * @type {APIReference}
	 * @memberof MagicItem
	 */
	equipmentCategory?: APIReference;
	/**
	 *
	 * @type {MagicItemRarity}
	 * @memberof MagicItem
	 */
	rarity?: MagicItemRarity;
	/**
	 *
	 * @type {Array<APIReference>}
	 * @memberof MagicItem
	 */
	variants?: Array<APIReference>;
	/**
	 * Whether this is a variant or not
	 * @type {boolean}
	 * @memberof MagicItem
	 */
	variant?: boolean;
}
/**
 *
 * @export
 * @interface MagicItemRarity
 */
export interface MagicItemRarity {
	/**
	 * The rarity of the item.
	 * @type {string}
	 * @memberof MagicItemRarity
	 */
	name?: MagicItemRarity.NameEnum;
}

/**
 * @export
 * @namespace MagicItemRarity
 */
export namespace MagicItemRarity {
	/**
	 * @export
	 * @enum {string}
	 */
	export enum NameEnum {
		Varies = <any>'Varies',
		Common = <any>'Common',
		Uncommon = <any>'Uncommon',
		Rare = <any>'Rare',
		VeryRare = <any>'Very Rare',
		Legendary = <any>'Legendary',
		Artifact = <any>'Artifact'
	}
}
/**
 * `MagicSchool`
 * @export
 * @interface MagicSchool
 */
export interface MagicSchool extends APIReference {
	/**
	 * Brief description of the resource.
	 * @type {string}
	 * @memberof MagicSchool
	 */
	desc?: string;
}
/**
 * `Class`
 * @export
 * @interface ModelClass
 */
export interface ModelClass extends APIReference {
	/**
	 * Hit die of the class. (ex: 12 == 1d12).
	 * @type {number}
	 * @memberof ModelClass
	 */
	hitDie?: number;
	/**
	 * URL of the level resource for the class.
	 * @type {string}
	 * @memberof ModelClass
	 */
	classLevels?: string;
	/**
	 *
	 * @type {Multiclassing}
	 * @memberof ModelClass
	 */
	multiClassing?: Multiclassing;
	/**
	 *
	 * @type {Spellcasting}
	 * @memberof ModelClass
	 */
	spellcasting?: Spellcasting;
	/**
	 * URL of the spell resource list for the class.
	 * @type {string}
	 * @memberof ModelClass
	 */
	spells?: string;
	/**
	 * List of equipment and their quantities all players of the class start with.
	 * @type {Array<ClassStartingEquipment>}
	 * @memberof ModelClass
	 */
	startingEquipment?: Array<ClassStartingEquipment>;
	/**
	 * List of choices of starting equipment.
	 * @type {Array<Choice>}
	 * @memberof ModelClass
	 */
	startingEquipmentOptions?: Array<Choice>;
	/**
	 * List of choices of starting proficiencies.
	 * @type {Array<Choice>}
	 * @memberof ModelClass
	 */
	proficiencyChoices?: Array<Choice>;
	/**
	 * List of starting proficiencies for all new characters of this class.
	 * @type {Array<APIReference>}
	 * @memberof ModelClass
	 */
	proficiencies?: Array<APIReference>;
	/**
	 * Saving throws the class is proficient in.
	 * @type {Array<APIReference>}
	 * @memberof ModelClass
	 */
	savingThrows?: Array<APIReference>;
	/**
	 * List of all possible subclasses this class can specialize in.
	 * @type {Array<APIReference>}
	 * @memberof ModelClass
	 */
	subclasses?: Array<APIReference>;
}
/**
 * `Monster`
 * @export
 * @interface Monster
 */
export interface Monster extends APIReference {
	/**
	 * Description of the resource.
	 * @type {Array<string>}
	 * @memberof Monster
	 */
	desc?: Array<string>;
	/**
	 * A monster's ability to charm or intimidate a player.
	 * @type {number}
	 * @memberof Monster
	 */
	charisma?: number;
	/**
	 * How sturdy a monster is.\"
	 * @type {number}
	 * @memberof Monster
	 */
	constitution?: number;
	/**
	 * The monster's ability for swift movement or stealth
	 * @type {number}
	 * @memberof Monster
	 */
	dexterity?: number;
	/**
	 * The monster's ability to outsmart a player.
	 * @type {number}
	 * @memberof Monster
	 */
	intelligence?: number;
	/**
	 * How hard a monster can hit a player.
	 * @type {number}
	 * @memberof Monster
	 */
	strength?: number;
	/**
	 * A monster's ability to ascertain the player's plan.
	 * @type {number}
	 * @memberof Monster
	 */
	wisdom?: number;
	/**
	 * The image url of the monster.
	 * @type {string}
	 * @memberof Monster
	 */
	image?: string;
	/**
	 * The size of the monster ranging from Tiny to Gargantuan.\"
	 * @type {string}
	 * @memberof Monster
	 */
	size?: Monster.SizeEnum;
	/**
	 * The type of monster.
	 * @type {string}
	 * @memberof Monster
	 */
	type?: string;
	/**
	 * The sub-category of a monster used for classification of monsters.\"
	 * @type {string}
	 * @memberof Monster
	 */
	subtype?: string;
	/**
	 * A creature's general moral and personal attitudes.
	 * @type {string}
	 * @memberof Monster
	 */
	alignments?: Monster.AlignmentsEnum;
	/**
	 * The difficulty for a player to successfully deal damage to a monster.
	 * @type {number}
	 * @memberof Monster
	 */
	armorClass?: number;
	/**
	 * The hit points of a monster determine how much damage it is able to take before it can be defeated.
	 * @type {number}
	 * @memberof Monster
	 */
	hitPoints?: number;
	/**
	 * The hit die of a monster can be used to make a version of the same monster whose hit points are determined by the roll of the die. For example: A monster with 2d6 would have its hit points determine by rolling a 6 sided die twice.
	 * @type {string}
	 * @memberof Monster
	 */
	hitDice?: string;
	/**
	 * The roll for determining a monster's hit points, which consists of the hit dice (e.g. 18d10) and the modifier determined by its Constitution (e.g. +36). For example, 18d10+36
	 * @type {string}
	 * @memberof Monster
	 */
	hitPointsRoll?: string;
	/**
	 * A list of actions that are available to the monster to take during combat.
	 * @type {Array<MonsterActions1>}
	 * @memberof Monster
	 */
	actions?: Array<MonsterActions1>;
	/**
	 * A list of legendary actions that are available to the monster to take during combat.
	 * @type {Array<MonsterallOf3propertiesactionsitems>}
	 * @memberof Monster
	 */
	legendaryActions?: Array<MonsterallOf3propertiesactionsitems>;
	/**
	 * A monster's challenge rating is a guideline number that says when a monster becomes an appropriate challenge against the party's average level. For example. A group of 4 players with an average level of 4 would have an appropriate combat challenge against a monster with a challenge rating of 4 but a monster with a challenge rating of 8 against the same group of players would pose a significant threat.
	 * @type {number}
	 * @memberof Monster
	 */
	challengeRating?: number;
	/**
	 * A list of conditions that a monster is immune to.
	 * @type {Array<APIReference>}
	 * @memberof Monster
	 */
	conditionImmunities?: Array<APIReference>;
	/**
	 * A list of damage types that a monster will take double damage from.
	 * @type {Array<string>}
	 * @memberof Monster
	 */
	damageImmunities?: Array<string>;
	/**
	 * A list of damage types that a monster will take half damage from.
	 * @type {Array<string>}
	 * @memberof Monster
	 */
	damageResistances?: Array<string>;
	/**
	 * A list of damage types that a monster will take double damage from.
	 * @type {Array<string>}
	 * @memberof Monster
	 */
	damageVulnerabilities?: Array<string>;
	/**
	 * List of other related monster entries that are of the same form. Only applicable to Lycanthropes that have multiple forms.
	 * @type {Array<APIReference>}
	 * @memberof Monster
	 */
	forms?: Array<APIReference>;
	/**
	 * The languages a monster is able to speak.
	 * @type {string}
	 * @memberof Monster
	 */
	languages?: string;
	/**
	 * A list of proficiencies of a monster.
	 * @type {Array<MonsterProficiencies>}
	 * @memberof Monster
	 */
	proficiencies?: Array<MonsterProficiencies>;
	/**
	 * A list of reactions that is available to the monster to take during combat.
	 * @type {Array<MonsterallOf3propertiesactionsitems>}
	 * @memberof Monster
	 */
	reactions?: Array<MonsterallOf3propertiesactionsitems>;
	/**
	 * Monsters typically have a passive perception but they might also have other senses to detect players.
	 * @type {any}
	 * @memberof Monster
	 */
	senses?: any;
	/**
	 * A list of the monster's special abilities.
	 * @type {Array<MonsterSpecialAbilities>}
	 * @memberof Monster
	 */
	specialAbilities?: Array<MonsterSpecialAbilities>;
	/**
	 *
	 * @type {MonsterSpeed}
	 * @memberof Monster
	 */
	speed?: MonsterSpeed;
	/**
	 * The number of experience points (XP) a monster is worth is based on its challenge rating.
	 * @type {number}
	 * @memberof Monster
	 */
	xp?: number;
}

/**
 * @export
 * @namespace Monster
 */
export namespace Monster {
	/**
	 * @export
	 * @enum {string}
	 */
	export enum SizeEnum {
		Tiny = <any>'Tiny',
		Small = <any>'Small',
		Medium = <any>'Medium',
		Large = <any>'Large',
		Huge = <any>'Huge',
		Gargantuan = <any>'Gargantuan'
	}
	/**
	 * @export
	 * @enum {string}
	 */
	export enum AlignmentsEnum {
		ChaoticNeutral = <any>'chaotic neutral',
		ChaoticEvil = <any>'chaotic evil',
		ChaoticGood = <any>'chaotic good',
		LawfulNeutral = <any>'lawful neutral',
		LawfulEvil = <any>'lawful evil',
		LawfulGood = <any>'lawful good',
		Neutral = <any>'neutral',
		NeutralEvil = <any>'neutral evil',
		NeutralGood = <any>'neutral good',
		AnyAlignment = <any>'any alignment',
		Unaligned = <any>'unaligned'
	}
}
/**
 *
 * @export
 * @interface MonsterActions
 */
export interface MonsterActions {
	/**
	 *
	 * @type {string}
	 * @memberof MonsterActions
	 */
	actionName?: string;
	/**
	 *
	 * @type {number}
	 * @memberof MonsterActions
	 */
	count?: number;
	/**
	 *
	 * @type {string}
	 * @memberof MonsterActions
	 */
	type?: MonsterActions.TypeEnum;
}

/**
 * @export
 * @namespace MonsterActions
 */
export namespace MonsterActions {
	/**
	 * @export
	 * @enum {string}
	 */
	export enum TypeEnum {
		Melee = <any>'melee',
		Ranged = <any>'ranged',
		Ability = <any>'ability',
		Magic = <any>'magic'
	}
}
/**
 * Action available to a `Monster` in addition to the standard creature actions.
 * @export
 * @interface MonsterActions1
 */
export interface MonsterActions1 {
	/**
	 *
	 * @type {string}
	 * @memberof MonsterActions1
	 */
	name?: string;
	/**
	 *
	 * @type {string}
	 * @memberof MonsterActions1
	 */
	desc?: string;
	/**
	 *
	 * @type {Choice}
	 * @memberof MonsterActions1
	 */
	actionOptions?: Choice;
	/**
	 *
	 * @type {Array<MonsterActions>}
	 * @memberof MonsterActions1
	 */
	actions?: Array<MonsterActions>;
	/**
	 *
	 * @type {Choice}
	 * @memberof MonsterActions1
	 */
	options?: Choice;
	/**
	 *
	 * @type {string}
	 * @memberof MonsterActions1
	 */
	multiattackType?: string;
	/**
	 *
	 * @type {number}
	 * @memberof MonsterActions1
	 */
	attackBonus?: number;
	/**
	 *
	 * @type {MonsterDc}
	 * @memberof MonsterActions1
	 */
	dc?: MonsterDc;
	/**
	 *
	 * @type {Array<MonsterAttacks>}
	 * @memberof MonsterActions1
	 */
	attacks?: Array<MonsterAttacks>;
	/**
	 *
	 * @type {Array<MonsterDamage>}
	 * @memberof MonsterActions1
	 */
	damage?: Array<MonsterDamage>;
}
/**
 *
 * @export
 * @interface MonsterAttacks
 */
export interface MonsterAttacks {
	/**
	 *
	 * @type {string}
	 * @memberof MonsterAttacks
	 */
	name?: string;
	/**
	 *
	 * @type {Paths1api1monsters17Bindex7Dgetresponses200contentapplication1jsonschemaallOf3propertiesactionsitemspropertiesdc}
	 * @memberof MonsterAttacks
	 */
	dc?: Paths1api1monsters17Bindex7Dgetresponses200contentapplication1jsonschemaallOf3propertiesactionsitemspropertiesdc;
	/**
	 *
	 * @type {Paths1api1monsters17Bindex7Dgetresponses200contentapplication1jsonschemaallOf3propertiesactionsitemspropertiesdamageitems}
	 * @memberof MonsterAttacks
	 */
	damage?: Paths1api1monsters17Bindex7Dgetresponses200contentapplication1jsonschemaallOf3propertiesactionsitemspropertiesdamageitems;
}
/**
 * Damage type and dice associated with a particular attack.
 * @export
 * @interface MonsterDamage
 */
export interface MonsterDamage {
	/**
	 *
	 * @type {APIReference}
	 * @memberof MonsterDamage
	 */
	damageType?: APIReference;
	/**
	 *
	 * @type {string}
	 * @memberof MonsterDamage
	 */
	damageDice?: string;
}
/**
 * Ability Check associated with a particular action.
 * @export
 * @interface MonsterDc
 */
export interface MonsterDc {
	/**
	 * Reference to the `AbilityScore` used for this DC.
	 * @type {APIReference}
	 * @memberof MonsterDc
	 */
	dcType?: APIReference;
	/**
	 * Check must equal or exceed this value for success.
	 * @type {number}
	 * @memberof MonsterDc
	 */
	dcValue?: number;
	/**
	 * How to modify damage on a successful check.
	 * @type {string}
	 * @memberof MonsterDc
	 */
	successType?: string;
}
/**
 *
 * @export
 * @interface MonsterProficiencies
 */
export interface MonsterProficiencies {
	/**
	 *
	 * @type {number}
	 * @memberof MonsterProficiencies
	 */
	value?: number;
	/**
	 *
	 * @type {APIReference}
	 * @memberof MonsterProficiencies
	 */
	proficiency?: APIReference;
}
/**
 *
 * @export
 * @interface MonsterSpecialAbilities
 */
export interface MonsterSpecialAbilities {
	/**
	 *
	 * @type {string}
	 * @memberof MonsterSpecialAbilities
	 */
	name?: string;
	/**
	 *
	 * @type {string}
	 * @memberof MonsterSpecialAbilities
	 */
	desc?: string;
	/**
	 *
	 * @type {number}
	 * @memberof MonsterSpecialAbilities
	 */
	attackBonus?: number;
	/**
	 *
	 * @type {Array<Paths1api1monsters17Bindex7Dgetresponses200contentapplication1jsonschemaallOf3propertiesactionsitemspropertiesdamageitems>}
	 * @memberof MonsterSpecialAbilities
	 */
	damage?: Array<Paths1api1monsters17Bindex7Dgetresponses200contentapplication1jsonschemaallOf3propertiesactionsitemspropertiesdamageitems>;
	/**
	 *
	 * @type {Paths1api1monsters17Bindex7Dgetresponses200contentapplication1jsonschemaallOf3propertiesactionsitemspropertiesdc}
	 * @memberof MonsterSpecialAbilities
	 */
	dc?: Paths1api1monsters17Bindex7Dgetresponses200contentapplication1jsonschemaallOf3propertiesactionsitemspropertiesdc;
	/**
	 *
	 * @type {MonsterSpellcasting}
	 * @memberof MonsterSpecialAbilities
	 */
	spellcasting?: MonsterSpellcasting;
	/**
	 *
	 * @type {MonsterUsage}
	 * @memberof MonsterSpecialAbilities
	 */
	usage?: MonsterUsage;
}
/**
 * Speed for a monster determines how fast it can move per turn.
 * @export
 * @interface MonsterSpeed
 */
export interface MonsterSpeed {
	/**
	 * All creatures have a walking speed, simply called the monster’s speed. Creatures that have no form of ground-based locomotion have a walking speed of 0 feet.
	 * @type {string}
	 * @memberof MonsterSpeed
	 */
	walk?: string;
	/**
	 * A monster that has a burrowing speed can use that speed to move through sand, earth, mud, or ice. A monster can’t burrow through solid rock unless it has a special trait that allows it to do so.
	 * @type {string}
	 * @memberof MonsterSpeed
	 */
	burrow?: string;
	/**
	 * A monster that has a climbing speed can use all or part of its movement to move on vertical surfaces. The monster doesn’t need to spend extra movement to climb.
	 * @type {string}
	 * @memberof MonsterSpeed
	 */
	climb?: string;
	/**
	 * A monster that has a flying speed can use all or part of its movement to fly.
	 * @type {string}
	 * @memberof MonsterSpeed
	 */
	fly?: string;
	/**
	 * A monster that has a swimming speed doesn’t need to spend extra movement to swim.
	 * @type {string}
	 * @memberof MonsterSpeed
	 */
	swim?: string;
}
/**
 *
 * @export
 * @interface MonsterSpellcasting
 */
export interface MonsterSpellcasting {
	/**
	 *
	 * @type {APIReference}
	 * @memberof MonsterSpellcasting
	 */
	ability?: APIReference;
	/**
	 *
	 * @type {number}
	 * @memberof MonsterSpellcasting
	 */
	dc?: number;
	/**
	 *
	 * @type {number}
	 * @memberof MonsterSpellcasting
	 */
	modifier?: number;
	/**
	 *
	 * @type {Array<string>}
	 * @memberof MonsterSpellcasting
	 */
	componentsRequired?: Array<string>;
	/**
	 *
	 * @type {string}
	 * @memberof MonsterSpellcasting
	 */
	school?: string;
	/**
	 *
	 * @type {{ [key: string]: number; }}
	 * @memberof MonsterSpellcasting
	 */
	slots?: { [key: string]: number };
	/**
	 *
	 * @type {Array<MonsterSpellcastingSpells>}
	 * @memberof MonsterSpellcasting
	 */
	spells?: Array<MonsterSpellcastingSpells>;
}
/**
 *
 * @export
 * @interface MonsterSpellcastingSpells
 */
export interface MonsterSpellcastingSpells {
	/**
	 *
	 * @type {string}
	 * @memberof MonsterSpellcastingSpells
	 */
	name?: string;
	/**
	 *
	 * @type {number}
	 * @memberof MonsterSpellcastingSpells
	 */
	level?: number;
	/**
	 *
	 * @type {string}
	 * @memberof MonsterSpellcastingSpells
	 */
	url?: string;
	/**
	 *
	 * @type {Paths1api1monsters17Bindex7Dgetresponses200contentapplication1jsonschemaallOf3propertiesspecialAbilitiesitemspropertiesusage}
	 * @memberof MonsterSpellcastingSpells
	 */
	usage?: Paths1api1monsters17Bindex7Dgetresponses200contentapplication1jsonschemaallOf3propertiesspecialAbilitiesitemspropertiesusage;
}
/**
 *
 * @export
 * @interface MonsterUsage
 */
export interface MonsterUsage {
	/**
	 *
	 * @type {string}
	 * @memberof MonsterUsage
	 */
	type?: MonsterUsage.TypeEnum;
	/**
	 *
	 * @type {Array<string>}
	 * @memberof MonsterUsage
	 */
	restTypes?: Array<string>;
	/**
	 *
	 * @type {number}
	 * @memberof MonsterUsage
	 */
	times?: number;
}

/**
 * @export
 * @namespace MonsterUsage
 */
export namespace MonsterUsage {
	/**
	 * @export
	 * @enum {string}
	 */
	export enum TypeEnum {
		AtWill = <any>'at will',
		PerDay = <any>'per day',
		RechargeAfterRest = <any>'recharge after rest',
		RechargeOnRoll = <any>'recharge on roll'
	}
}
/**
 * `Multiclassing`
 * @export
 * @interface Multiclassing
 */
export interface Multiclassing {
	/**
	 * List of prerequisites that must be met.
	 * @type {Array<Prerequisite>}
	 * @memberof Multiclassing
	 */
	prerequisites?: Array<Prerequisite>;
	/**
	 * List of choices of prerequisites to meet for.
	 * @type {Array<Choice>}
	 * @memberof Multiclassing
	 */
	prerequisiteOptions?: Array<Choice>;
	/**
	 * List of proficiencies available when multiclassing.
	 * @type {Array<APIReference>}
	 * @memberof Multiclassing
	 */
	proficiencies?: Array<APIReference>;
	/**
	 * List of choices of proficiencies that are given when multiclassing.
	 * @type {Array<Choice>}
	 * @memberof Multiclassing
	 */
	proficiencyChoices?: Array<Choice>;
}
/**
 * `Option`
 * @export
 * @interface Option
 */
export interface Option {}
/**
 * `Option Set`
 * @export
 * @interface OptionSet
 */
export interface OptionSet {}
/**
 * `Prerequisite`
 * @export
 * @interface Prerequisite
 */
export interface Prerequisite {
	/**
	 *
	 * @type {APIReference}
	 * @memberof Prerequisite
	 */
	abilityScore?: APIReference;
	/**
	 * Minimum score to meet the prerequisite.
	 * @type {number}
	 * @memberof Prerequisite
	 */
	minimumScore?: number;
}
/**
 * `Proficiency`
 * @export
 * @interface Proficiency
 */
export interface Proficiency extends APIReference {
	/**
	 * The general category of the proficiency.
	 * @type {string}
	 * @memberof Proficiency
	 */
	type?: string;
	/**
	 * Classes that start with this proficiency.
	 * @type {Array<APIReference>}
	 * @memberof Proficiency
	 */
	classes?: Array<APIReference>;
	/**
	 * Races that start with this proficiency.
	 * @type {Array<APIReference>}
	 * @memberof Proficiency
	 */
	races?: Array<APIReference>;
	/**
	 * `APIReference` to the full description of the related resource.
	 * @type {APIReference}
	 * @memberof Proficiency
	 */
	reference?: APIReference;
}
/**
 * `Race`
 * @export
 * @interface Race
 */
export interface Race extends APIReference {
	/**
	 * Base move speed for this race (in feet per round).
	 * @type {number}
	 * @memberof Race
	 */
	speed?: number;
	/**
	 * Racial bonuses to ability scores.
	 * @type {Array<AbilityBonus>}
	 * @memberof Race
	 */
	abilityBonuses?: Array<AbilityBonus>;
	/**
	 * Flavor description of likely alignments this race takes.
	 * @type {string}
	 * @memberof Race
	 */
	alignment?: string;
	/**
	 * Flavor description of possible ages for this race.
	 * @type {string}
	 * @memberof Race
	 */
	age?: string;
	/**
	 * Size class of this race.
	 * @type {string}
	 * @memberof Race
	 */
	size?: string;
	/**
	 * Flavor description of height and weight for this race.
	 * @type {string}
	 * @memberof Race
	 */
	sizeDescription?: string;
	/**
	 * Starting proficiencies for all new characters of this race.
	 * @type {Array<APIReference>}
	 * @memberof Race
	 */
	startingProficiencies?: Array<APIReference>;
	/**
	 *
	 * @type {Choice}
	 * @memberof Race
	 */
	startingProficiencyOptions?: Choice;
	/**
	 * Starting languages for all new characters of this race.
	 * @type {Array<APIReference>}
	 * @memberof Race
	 */
	languages?: Array<APIReference>;
	/**
	 * Flavor description of the languages this race knows.
	 * @type {string}
	 * @memberof Race
	 */
	languageDesc?: string;
	/**
	 * Racial traits that provide benefits to its members.
	 * @type {Array<APIReference>}
	 * @memberof Race
	 */
	traits?: Array<APIReference>;
	/**
	 * All possible subraces that this race includes.
	 * @type {Array<APIReference>}
	 * @memberof Race
	 */
	subraces?: Array<APIReference>;
}
/**
 *
 * @export
 * @interface ResourceDescription
 */
export interface ResourceDescription {
	/**
	 * Description of the resource.
	 * @type {Array<string>}
	 * @memberof ResourceDescription
	 */
	desc?: Array<string>;
}
/**
 * `Rule`
 * @export
 * @interface Rule
 */
export interface Rule extends APIReference {
	/**
	 * Description of the rule.
	 * @type {string}
	 * @memberof Rule
	 */
	desc?: string;
	/**
	 * List of sections for each subheading underneath the rule in the SRD.
	 * @type {Array<APIReference>}
	 * @memberof Rule
	 */
	subsections?: Array<APIReference>;
}
/**
 * `RuleSection`
 * @export
 * @interface RuleSection
 */
export interface RuleSection extends APIReference {
	/**
	 * Description of the rule.
	 * @type {string}
	 * @memberof RuleSection
	 */
	desc?: string;
}
/**
 * `Skill`
 * @export
 * @interface Skill
 */
export interface Skill extends APIReference {
	/**
	 * Description of the resource.
	 * @type {Array<string>}
	 * @memberof Skill
	 */
	desc?: Array<string>;
	/**
	 *
	 * @type {APIReference}
	 * @memberof Skill
	 */
	abilityScore?: APIReference;
}
/**
 * `Spell`
 * @export
 * @interface Spell
 */
export interface Spell extends APIReference {
	/**
	 * Description of the resource.
	 * @type {Array<string>}
	 * @memberof Spell
	 */
	desc?: Array<string>;
	/**
	 * List of descriptions for casting the spell at higher levels.
	 * @type {Array<string>}
	 * @memberof Spell
	 */
	higherLevel?: Array<string>;
	/**
	 * Range of the spell, usually expressed in feet.
	 * @type {string}
	 * @memberof Spell
	 */
	range?: string;
	/**
	 * List of shorthand for required components of the spell. V: verbal S: somatic M: material
	 * @type {Array<string>}
	 * @memberof Spell
	 */
	components?: Array<Spell.ComponentsEnum>;
	/**
	 * Material component for the spell to be cast.
	 * @type {string}
	 * @memberof Spell
	 */
	material?: string;
	/**
	 *
	 * @type {AreaOfEffect}
	 * @memberof Spell
	 */
	areaOfEffect?: AreaOfEffect;
	/**
	 * Determines if a spell can be cast in a 10-min(in-game) ritual.
	 * @type {boolean}
	 * @memberof Spell
	 */
	ritual?: boolean;
	/**
	 * How long the spell effect lasts.
	 * @type {string}
	 * @memberof Spell
	 */
	duration?: string;
	/**
	 * Determines if a spell needs concentration to persist.
	 * @type {boolean}
	 * @memberof Spell
	 */
	concentration?: boolean;
	/**
	 * How long it takes for the spell to activate.
	 * @type {string}
	 * @memberof Spell
	 */
	castingTime?: string;
	/**
	 * Level of the spell.
	 * @type {number}
	 * @memberof Spell
	 */
	level?: number;
	/**
	 * Attack type of the spell.
	 * @type {string}
	 * @memberof Spell
	 */
	attackType?: string;
	/**
	 *
	 * @type {SpellDamage}
	 * @memberof Spell
	 */
	damage?: SpellDamage;
	/**
	 *
	 * @type {APIReference}
	 * @memberof Spell
	 */
	school?: APIReference;
	/**
	 * List of classes that are able to learn the spell.
	 * @type {Array<APIReference>}
	 * @memberof Spell
	 */
	classes?: Array<APIReference>;
	/**
	 * List of subclasses that have access to the spell.
	 * @type {Array<APIReference>}
	 * @memberof Spell
	 */
	subclasses?: Array<APIReference>;
}

/**
 * @export
 * @namespace Spell
 */
export namespace Spell {
	/**
	 * @export
	 * @enum {string}
	 */
	export enum ComponentsEnum {
		V = <any>'V',
		S = <any>'S',
		M = <any>'M'
	}
}
/**
 *
 * @export
 * @interface SpellDamage
 */
export interface SpellDamage {
	/**
	 *
	 * @type {{ [key: string]: any; }}
	 * @memberof SpellDamage
	 */
	damageAtSlotLevel?: { [key: string]: any };
	/**
	 *
	 * @type {APIReference}
	 * @memberof SpellDamage
	 */
	damageType?: APIReference;
}
/**
 * `SpellPrerequisite`
 * @export
 * @interface SpellPrerequisite
 */
export interface SpellPrerequisite extends APIReference {
	/**
	 * The type of prerequisite.
	 * @type {string}
	 * @memberof SpellPrerequisite
	 */
	type?: string;
}
/**
 * `Spellcasting`
 * @export
 * @interface Spellcasting
 */
export interface Spellcasting {
	/**
	 * Level at which the class can start using its spellcasting abilities.
	 * @type {number}
	 * @memberof Spellcasting
	 */
	level?: number;
	/**
	 * Descriptions of the class' ability to cast spells.
	 * @type {Array<SpellcastingInfo>}
	 * @memberof Spellcasting
	 */
	info?: Array<SpellcastingInfo>;
	/**
	 * Reference to the `AbilityScore` used for spellcasting by the class.
	 * @type {APIReference}
	 * @memberof Spellcasting
	 */
	spellcastingAbility?: APIReference;
}
/**
 *
 * @export
 * @interface SpellcastingInfo
 */
export interface SpellcastingInfo {
	/**
	 * Feature name.
	 * @type {string}
	 * @memberof SpellcastingInfo
	 */
	name?: string;
	/**
	 * Feature description.
	 * @type {Array<string>}
	 * @memberof SpellcastingInfo
	 */
	desc?: Array<string>;
}
/**
 * `Subclass`
 * @export
 * @interface Subclass
 */
export interface Subclass extends APIReference {
	/**
	 * Description of the resource.
	 * @type {Array<string>}
	 * @memberof Subclass
	 */
	desc?: Array<string>;
	/**
	 *
	 * @type {APIReference}
	 * @memberof Subclass
	 */
	_class?: APIReference;
	/**
	 * Lore-friendly flavor text for a classes respective subclass.
	 * @type {string}
	 * @memberof Subclass
	 */
	subclassFlavor?: string;
	/**
	 * Resource url that shows the subclass level progression.
	 * @type {string}
	 * @memberof Subclass
	 */
	subclassLevels?: string;
	/**
	 *
	 * @type {Array<SubclassSpells>}
	 * @memberof Subclass
	 */
	spells?: Array<SubclassSpells>;
}
/**
 * `SubclassLevel`
 * @export
 * @interface SubclassLevel
 */
export interface SubclassLevel {
	/**
	 * Resource index for shorthand searching.
	 * @type {string}
	 * @memberof SubclassLevel
	 */
	index?: string;
	/**
	 * URL of the referenced resource.
	 * @type {string}
	 * @memberof SubclassLevel
	 */
	url?: string;
	/**
	 * Number value for the current level object.
	 * @type {number}
	 * @memberof SubclassLevel
	 */
	level?: number;
	/**
	 * Total number of ability score bonuses gained, added from previous levels.
	 * @type {number}
	 * @memberof SubclassLevel
	 */
	abilityScoreBonuses?: number;
	/**
	 * Proficiency bonus for this class at the specified level.
	 * @type {number}
	 * @memberof SubclassLevel
	 */
	profBonus?: number;
	/**
	 * List of features gained at this level.
	 * @type {Array<APIReference>}
	 * @memberof SubclassLevel
	 */
	features?: Array<APIReference>;
	/**
	 *
	 * @type {SubclassLevelSpellcasting}
	 * @memberof SubclassLevel
	 */
	spellcasting?: SubclassLevelSpellcasting;
	/**
	 * Class specific information such as dice values for bard songs and number of warlock invocations.
	 * @type {{ [key: string]: any; }}
	 * @memberof SubclassLevel
	 */
	classspecific?: { [key: string]: any };
}
/**
 *
 * @export
 * @interface SubclassLevelResource
 */
export interface SubclassLevelResource {
	/**
	 *
	 * @type {string}
	 * @memberof SubclassLevelResource
	 */
	index?: string;
	/**
	 *
	 * @type {string}
	 * @memberof SubclassLevelResource
	 */
	url?: string;
	/**
	 *
	 * @type {number}
	 * @memberof SubclassLevelResource
	 */
	level?: number;
	/**
	 *
	 * @type {Array<APIReference>}
	 * @memberof SubclassLevelResource
	 */
	features?: Array<APIReference>;
	/**
	 *
	 * @type {APIReference}
	 * @memberof SubclassLevelResource
	 */
	_class?: APIReference;
	/**
	 *
	 * @type {APIReference}
	 * @memberof SubclassLevelResource
	 */
	subclass?: APIReference;
}
/**
 * Summary of spells known at this level.
 * @export
 * @interface SubclassLevelSpellcasting
 */
export interface SubclassLevelSpellcasting {
	/**
	 *
	 * @type {number}
	 * @memberof SubclassLevelSpellcasting
	 */
	cantripsKnown?: number;
	/**
	 *
	 * @type {number}
	 * @memberof SubclassLevelSpellcasting
	 */
	spellsKnown?: number;
	/**
	 *
	 * @type {number}
	 * @memberof SubclassLevelSpellcasting
	 */
	spellSlotsLevel1?: number;
	/**
	 *
	 * @type {number}
	 * @memberof SubclassLevelSpellcasting
	 */
	spellSlotsLevel2?: number;
	/**
	 *
	 * @type {number}
	 * @memberof SubclassLevelSpellcasting
	 */
	spellSlotsLevel3?: number;
	/**
	 *
	 * @type {number}
	 * @memberof SubclassLevelSpellcasting
	 */
	spellSlotsLevel4?: number;
	/**
	 *
	 * @type {number}
	 * @memberof SubclassLevelSpellcasting
	 */
	spellSlotsLevel5?: number;
	/**
	 *
	 * @type {number}
	 * @memberof SubclassLevelSpellcasting
	 */
	spellSlotsLevel6?: number;
	/**
	 *
	 * @type {number}
	 * @memberof SubclassLevelSpellcasting
	 */
	spellSlotsLevel7?: number;
	/**
	 *
	 * @type {number}
	 * @memberof SubclassLevelSpellcasting
	 */
	spellSlotsLevel8?: number;
	/**
	 *
	 * @type {number}
	 * @memberof SubclassLevelSpellcasting
	 */
	spellSlotsLevel9?: number;
}
/**
 *
 * @export
 * @interface SubclassSpells
 */
export interface SubclassSpells {
	/**
	 *
	 * @type {Array<SpellPrerequisite>}
	 * @memberof SubclassSpells
	 */
	prerequisites?: Array<SpellPrerequisite>;
	/**
	 *
	 * @type {APIReference}
	 * @memberof SubclassSpells
	 */
	spell?: APIReference;
}
/**
 * `Subrace`
 * @export
 * @interface Subrace
 */
export interface Subrace extends APIReference {
	/**
	 * Description of the subrace.
	 * @type {string}
	 * @memberof Subrace
	 */
	desc?: string;
	/**
	 * Parent race for the subrace.
	 * @type {APIReference}
	 * @memberof Subrace
	 */
	race?: APIReference;
	/**
	 * Additional ability bonuses for the subrace.
	 * @type {Array<AbilityBonus>}
	 * @memberof Subrace
	 */
	abilityBonuses?: Array<AbilityBonus>;
	/**
	 * Starting proficiencies for all new characters of the subrace.
	 * @type {Array<APIReference>}
	 * @memberof Subrace
	 */
	startingProficiencies?: Array<APIReference>;
	/**
	 * Starting languages for all new characters of the subrace.
	 * @type {Array<APIReference>}
	 * @memberof Subrace
	 */
	languages?: Array<APIReference>;
	/**
	 *
	 * @type {Choice}
	 * @memberof Subrace
	 */
	languageOptions?: Choice;
	/**
	 * List of traits that for the subrace.
	 * @type {Array<APIReference>}
	 * @memberof Subrace
	 */
	racialTraits?: Array<APIReference>;
}
/**
 * `Trait`
 * @export
 * @interface Trait
 */
export interface Trait extends APIReference {
	/**
	 * Description of the resource.
	 * @type {Array<string>}
	 * @memberof Trait
	 */
	desc?: Array<string>;
	/**
	 * List of `Races` that have access to the trait.
	 * @type {Array<APIReference>}
	 * @memberof Trait
	 */
	races?: Array<APIReference>;
	/**
	 * List of `Subraces` that have access to the trait.
	 * @type {Array<APIReference>}
	 * @memberof Trait
	 */
	subraces?: Array<APIReference>;
	/**
	 * List of `Proficiencies` this trait grants.
	 * @type {Array<APIReference>}
	 * @memberof Trait
	 */
	proficiencies?: Array<APIReference>;
	/**
	 *
	 * @type {Choice}
	 * @memberof Trait
	 */
	proficiencyChoices?: Choice;
	/**
	 *
	 * @type {Choice}
	 * @memberof Trait
	 */
	languageOptions?: Choice;
	/**
	 * Information specific to this trait
	 * @type {Choice | any}
	 * @memberof Trait
	 */
	traitSpecific?: Choice | any;
}
/**
 * `Weapon`
 * @export
 * @interface Weapon
 */
export interface Weapon extends APIReference {
	/**
	 * Description of the resource.
	 * @type {Array<string>}
	 * @memberof Weapon
	 */
	desc?: Array<string>;
	/**
	 *
	 * @type {APIReference}
	 * @memberof Weapon
	 */
	equipmentCategory?: APIReference;
	/**
	 * The category of weapon this falls into.
	 * @type {string}
	 * @memberof Weapon
	 */
	weaponCategory?: string;
	/**
	 * Whether this is a Melee or Ranged weapon.
	 * @type {string}
	 * @memberof Weapon
	 */
	weaponRange?: string;
	/**
	 * A combination of weapon_category and weapon_range.
	 * @type {string}
	 * @memberof Weapon
	 */
	categoryRange?: string;
	/**
	 *
	 * @type {WeaponRange}
	 * @memberof Weapon
	 */
	range?: WeaponRange;
	/**
	 *
	 * @type {Damage}
	 * @memberof Weapon
	 */
	damage?: Damage;
	/**
	 *
	 * @type {Damage}
	 * @memberof Weapon
	 */
	twoHandedDamage?: Damage;
	/**
	 * A list of the properties this weapon has.
	 * @type {Array<APIReference>}
	 * @memberof Weapon
	 */
	properties?: Array<APIReference>;
	/**
	 *
	 * @type {Cost}
	 * @memberof Weapon
	 */
	cost?: Cost;
	/**
	 * How much the equipment weighs.
	 * @type {number}
	 * @memberof Weapon
	 */
	weight?: number;
}
/**
 * WeaponProperty
 * @export
 * @interface WeaponProperty
 */
export interface WeaponProperty extends APIReference {
	/**
	 * Description of the resource.
	 * @type {Array<string>}
	 * @memberof WeaponProperty
	 */
	desc?: Array<string>;
}
/**
 *
 * @export
 * @interface WeaponRange
 */
export interface WeaponRange {
	/**
	 * The weapon's normal range in feet.
	 * @type {number}
	 * @memberof WeaponRange
	 */
	normal?: number;
	/**
	 * The weapon's long range in feet.
	 * @type {number}
	 * @memberof WeaponRange
	 */
	_long?: number;
}
/**
 * CharacterDataApi - fetch parameter creator
 * @export
 */
export const CharacterDataApiFetchParamCreator = function (configuration?: Configuration) {
	return {
		/**
		 * # Ability Score  Represents one of the six abilities that describes a creature's physical and mental characteristics. The three main rolls of the game - the ability check, the saving throw, and the attack roll - rely on the ability scores. [[SRD p76](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=76)]
		 * @summary Get an ability score by index.
		 * @param {string} index The &#x60;index&#x60; of the ability score to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiAbilityScoresIndexGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiAbilityScoresIndexGet.'
				);
			}
			const localVarPath = `/api/ability-scores/{index}`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 * # Alignment  A typical creature in the game world has an alignment, which broadly describes its moral and personal attitudes. Alignment is a combination of two factors: one identifies morality (good, evil, or neutral), and the other describes attitudes toward society and order (lawful, chaotic, or neutral). Thus, nine distinct alignments define the possible combinations.[[SRD p58](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=58)]
		 * @summary Get an alignment by index.
		 * @param {string} index The &#x60;index&#x60; of the alignment to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiAlignmentsIndexGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiAlignmentsIndexGet.'
				);
			}
			const localVarPath = `/api/alignments/{index}`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 * # Background  Every story has a beginning. Your character's background reveals where you came from, how you became an adventurer, and your place in the world. Choosing a background provides you with important story cues about your character's identity. [[SRD p60](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=60)]  _Note:_ acolyte is the only background included in the SRD.
		 * @summary Get a background by index.
		 * @param {string} index The &#x60;index&#x60; of the background to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiBackgroundsIndexGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiBackgroundsIndexGet.'
				);
			}
			const localVarPath = `/api/backgrounds/{index}`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 * # Language  Your race indicates the languages your character can speak by default, and your background might give you access to one or more additional languages of your choice. [[SRD p59](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=59)]
		 * @summary Get a language by index.
		 * @param {string} index The &#x60;index&#x60; of the language to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiLanguagesIndexGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiLanguagesIndexGet.'
				);
			}
			const localVarPath = `/api/languages/{index}`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 * # Proficiency   By virtue of race, class, and background a character is proficient at using certain skills, weapons, and equipment. Characters can also gain additional proficiencies at higher levels or by multiclassing. A characters starting proficiencies are determined during character creation.
		 * @summary Get a proficiency by index.
		 * @param {string} index The &#x60;index&#x60; of the proficiency to get.  Available values can be found in the [&#x60;ResourceList&#x60;](#get-/api/-endpoint-) for &#x60;proficiencies&#x60;.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiProficienciesIndexGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiProficienciesIndexGet.'
				);
			}
			const localVarPath = `/api/proficiencies/{index}`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 * # Skill  Each ability covers a broad range of capabilities, including skills that a character or a monster can be proficient in. A skill represents a specific aspect of an ability score, and an individual's proficiency in a skill demonstrates a focus on that aspect. [[SRD p77](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=77)]
		 * @summary Get a skill by index.
		 * @param {string} index The &#x60;index&#x60; of the skill to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSkillsIndexGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiSkillsIndexGet.'
				);
			}
			const localVarPath = `/api/skills/{index}`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		}
	};
};

/**
 * CharacterDataApi - functional programming interface
 * @export
 */
export const CharacterDataApiFp = function (configuration?: Configuration) {
	return {
		/**
		 * # Ability Score  Represents one of the six abilities that describes a creature's physical and mental characteristics. The three main rolls of the game - the ability check, the saving throw, and the attack roll - rely on the ability scores. [[SRD p76](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=76)]
		 * @summary Get an ability score by index.
		 * @param {string} index The &#x60;index&#x60; of the ability score to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiAbilityScoresIndexGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<AbilityScore> {
			const localVarFetchArgs = CharacterDataApiFetchParamCreator(
				configuration
			).apiAbilityScoresIndexGet(index, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 * # Alignment  A typical creature in the game world has an alignment, which broadly describes its moral and personal attitudes. Alignment is a combination of two factors: one identifies morality (good, evil, or neutral), and the other describes attitudes toward society and order (lawful, chaotic, or neutral). Thus, nine distinct alignments define the possible combinations.[[SRD p58](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=58)]
		 * @summary Get an alignment by index.
		 * @param {string} index The &#x60;index&#x60; of the alignment to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiAlignmentsIndexGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<Alignment> {
			const localVarFetchArgs = CharacterDataApiFetchParamCreator(
				configuration
			).apiAlignmentsIndexGet(index, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 * # Background  Every story has a beginning. Your character's background reveals where you came from, how you became an adventurer, and your place in the world. Choosing a background provides you with important story cues about your character's identity. [[SRD p60](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=60)]  _Note:_ acolyte is the only background included in the SRD.
		 * @summary Get a background by index.
		 * @param {string} index The &#x60;index&#x60; of the background to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiBackgroundsIndexGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<Background> {
			const localVarFetchArgs = CharacterDataApiFetchParamCreator(
				configuration
			).apiBackgroundsIndexGet(index, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 * # Language  Your race indicates the languages your character can speak by default, and your background might give you access to one or more additional languages of your choice. [[SRD p59](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=59)]
		 * @summary Get a language by index.
		 * @param {string} index The &#x60;index&#x60; of the language to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiLanguagesIndexGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<Language> {
			const localVarFetchArgs = CharacterDataApiFetchParamCreator(
				configuration
			).apiLanguagesIndexGet(index, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 * # Proficiency   By virtue of race, class, and background a character is proficient at using certain skills, weapons, and equipment. Characters can also gain additional proficiencies at higher levels or by multiclassing. A characters starting proficiencies are determined during character creation.
		 * @summary Get a proficiency by index.
		 * @param {string} index The &#x60;index&#x60; of the proficiency to get.  Available values can be found in the [&#x60;ResourceList&#x60;](#get-/api/-endpoint-) for &#x60;proficiencies&#x60;.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiProficienciesIndexGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<Proficiency> {
			const localVarFetchArgs = CharacterDataApiFetchParamCreator(
				configuration
			).apiProficienciesIndexGet(index, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 * # Skill  Each ability covers a broad range of capabilities, including skills that a character or a monster can be proficient in. A skill represents a specific aspect of an ability score, and an individual's proficiency in a skill demonstrates a focus on that aspect. [[SRD p77](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=77)]
		 * @summary Get a skill by index.
		 * @param {string} index The &#x60;index&#x60; of the skill to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSkillsIndexGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<Skill> {
			const localVarFetchArgs = CharacterDataApiFetchParamCreator(configuration).apiSkillsIndexGet(
				index,
				options
			);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		}
	};
};

/**
 * CharacterDataApi - factory interface
 * @export
 */
export const CharacterDataApiFactory = function (
	configuration?: Configuration,
	fetch?: FetchAPI,
	basePath?: string
) {
	return {
		/**
		 * # Ability Score  Represents one of the six abilities that describes a creature's physical and mental characteristics. The three main rolls of the game - the ability check, the saving throw, and the attack roll - rely on the ability scores. [[SRD p76](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=76)]
		 * @summary Get an ability score by index.
		 * @param {string} index The &#x60;index&#x60; of the ability score to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiAbilityScoresIndexGet(index: string, options?: any) {
			return CharacterDataApiFp(configuration).apiAbilityScoresIndexGet(index, options)(
				fetch,
				basePath
			);
		},
		/**
		 * # Alignment  A typical creature in the game world has an alignment, which broadly describes its moral and personal attitudes. Alignment is a combination of two factors: one identifies morality (good, evil, or neutral), and the other describes attitudes toward society and order (lawful, chaotic, or neutral). Thus, nine distinct alignments define the possible combinations.[[SRD p58](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=58)]
		 * @summary Get an alignment by index.
		 * @param {string} index The &#x60;index&#x60; of the alignment to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiAlignmentsIndexGet(index: string, options?: any) {
			return CharacterDataApiFp(configuration).apiAlignmentsIndexGet(index, options)(
				fetch,
				basePath
			);
		},
		/**
		 * # Background  Every story has a beginning. Your character's background reveals where you came from, how you became an adventurer, and your place in the world. Choosing a background provides you with important story cues about your character's identity. [[SRD p60](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=60)]  _Note:_ acolyte is the only background included in the SRD.
		 * @summary Get a background by index.
		 * @param {string} index The &#x60;index&#x60; of the background to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiBackgroundsIndexGet(index: string, options?: any) {
			return CharacterDataApiFp(configuration).apiBackgroundsIndexGet(index, options)(
				fetch,
				basePath
			);
		},
		/**
		 * # Language  Your race indicates the languages your character can speak by default, and your background might give you access to one or more additional languages of your choice. [[SRD p59](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=59)]
		 * @summary Get a language by index.
		 * @param {string} index The &#x60;index&#x60; of the language to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiLanguagesIndexGet(index: string, options?: any) {
			return CharacterDataApiFp(configuration).apiLanguagesIndexGet(index, options)(
				fetch,
				basePath
			);
		},
		/**
		 * # Proficiency   By virtue of race, class, and background a character is proficient at using certain skills, weapons, and equipment. Characters can also gain additional proficiencies at higher levels or by multiclassing. A characters starting proficiencies are determined during character creation.
		 * @summary Get a proficiency by index.
		 * @param {string} index The &#x60;index&#x60; of the proficiency to get.  Available values can be found in the [&#x60;ResourceList&#x60;](#get-/api/-endpoint-) for &#x60;proficiencies&#x60;.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiProficienciesIndexGet(index: string, options?: any) {
			return CharacterDataApiFp(configuration).apiProficienciesIndexGet(index, options)(
				fetch,
				basePath
			);
		},
		/**
		 * # Skill  Each ability covers a broad range of capabilities, including skills that a character or a monster can be proficient in. A skill represents a specific aspect of an ability score, and an individual's proficiency in a skill demonstrates a focus on that aspect. [[SRD p77](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=77)]
		 * @summary Get a skill by index.
		 * @param {string} index The &#x60;index&#x60; of the skill to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSkillsIndexGet(index: string, options?: any) {
			return CharacterDataApiFp(configuration).apiSkillsIndexGet(index, options)(fetch, basePath);
		}
	};
};

/**
 * CharacterDataApi - object-oriented interface
 * @export
 * @class CharacterDataApi
 * @extends {BaseAPI}
 */
export class CharacterDataApi extends BaseAPI {
	/**
	 * # Ability Score  Represents one of the six abilities that describes a creature's physical and mental characteristics. The three main rolls of the game - the ability check, the saving throw, and the attack roll - rely on the ability scores. [[SRD p76](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=76)]
	 * @summary Get an ability score by index.
	 * @param {string} index The &#x60;index&#x60; of the ability score to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof CharacterDataApi
	 */
	public apiAbilityScoresIndexGet(index: string, options?: any) {
		return CharacterDataApiFp(this.configuration).apiAbilityScoresIndexGet(index, options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 * # Alignment  A typical creature in the game world has an alignment, which broadly describes its moral and personal attitudes. Alignment is a combination of two factors: one identifies morality (good, evil, or neutral), and the other describes attitudes toward society and order (lawful, chaotic, or neutral). Thus, nine distinct alignments define the possible combinations.[[SRD p58](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=58)]
	 * @summary Get an alignment by index.
	 * @param {string} index The &#x60;index&#x60; of the alignment to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof CharacterDataApi
	 */
	public apiAlignmentsIndexGet(index: string, options?: any) {
		return CharacterDataApiFp(this.configuration).apiAlignmentsIndexGet(index, options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 * # Background  Every story has a beginning. Your character's background reveals where you came from, how you became an adventurer, and your place in the world. Choosing a background provides you with important story cues about your character's identity. [[SRD p60](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=60)]  _Note:_ acolyte is the only background included in the SRD.
	 * @summary Get a background by index.
	 * @param {string} index The &#x60;index&#x60; of the background to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof CharacterDataApi
	 */
	public apiBackgroundsIndexGet(index: string, options?: any) {
		return CharacterDataApiFp(this.configuration).apiBackgroundsIndexGet(index, options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 * # Language  Your race indicates the languages your character can speak by default, and your background might give you access to one or more additional languages of your choice. [[SRD p59](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=59)]
	 * @summary Get a language by index.
	 * @param {string} index The &#x60;index&#x60; of the language to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof CharacterDataApi
	 */
	public apiLanguagesIndexGet(index: string, options?: any) {
		return CharacterDataApiFp(this.configuration).apiLanguagesIndexGet(index, options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 * # Proficiency   By virtue of race, class, and background a character is proficient at using certain skills, weapons, and equipment. Characters can also gain additional proficiencies at higher levels or by multiclassing. A characters starting proficiencies are determined during character creation.
	 * @summary Get a proficiency by index.
	 * @param {string} index The &#x60;index&#x60; of the proficiency to get.  Available values can be found in the [&#x60;ResourceList&#x60;](#get-/api/-endpoint-) for &#x60;proficiencies&#x60;.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof CharacterDataApi
	 */
	public apiProficienciesIndexGet(index: string, options?: any) {
		return CharacterDataApiFp(this.configuration).apiProficienciesIndexGet(index, options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 * # Skill  Each ability covers a broad range of capabilities, including skills that a character or a monster can be proficient in. A skill represents a specific aspect of an ability score, and an individual's proficiency in a skill demonstrates a focus on that aspect. [[SRD p77](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=77)]
	 * @summary Get a skill by index.
	 * @param {string} index The &#x60;index&#x60; of the skill to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof CharacterDataApi
	 */
	public apiSkillsIndexGet(index: string, options?: any) {
		return CharacterDataApiFp(this.configuration).apiSkillsIndexGet(index, options)(
			this.fetch,
			this.basePath
		);
	}
}
/**
 * ClassApi - fetch parameter creator
 * @export
 */
export const ClassApiFetchParamCreator = function (configuration?: Configuration) {
	return {
		/**
		 * # Class  A character class is a fundamental part of the identity and nature of characters in the Dungeons & Dragons role-playing game. A character's capabilities, strengths, and weaknesses are largely defined by its class. A character's class affects a character's available skills and abilities. [[SRD p8-55](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=8)]
		 * @summary Get a class by index.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiClassesIndexGet.'
				);
			}
			const localVarPath = `/api/classes/{index}`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 *
		 * @summary Get multiclassing resource for a class.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexMultiClassingGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiClassesIndexMultiClassingGet.'
				);
			}
			const localVarPath = `/api/classes/{index}/multi-classing`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 *
		 * @summary Get spellcasting info for a class.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexSpellcastingGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiClassesIndexSpellcastingGet.'
				);
			}
			const localVarPath = `/api/classes/{index}/spellcasting`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		}
	};
};

/**
 * ClassApi - functional programming interface
 * @export
 */
export const ClassApiFp = function (configuration?: Configuration) {
	return {
		/**
		 * # Class  A character class is a fundamental part of the identity and nature of characters in the Dungeons & Dragons role-playing game. A character's capabilities, strengths, and weaknesses are largely defined by its class. A character's class affects a character's available skills and abilities. [[SRD p8-55](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=8)]
		 * @summary Get a class by index.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<ModelClass> {
			const localVarFetchArgs = ClassApiFetchParamCreator(configuration).apiClassesIndexGet(
				index,
				options
			);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 *
		 * @summary Get multiclassing resource for a class.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexMultiClassingGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<Multiclassing> {
			const localVarFetchArgs = ClassApiFetchParamCreator(
				configuration
			).apiClassesIndexMultiClassingGet(index, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 *
		 * @summary Get spellcasting info for a class.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexSpellcastingGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<Spellcasting> {
			const localVarFetchArgs = ClassApiFetchParamCreator(
				configuration
			).apiClassesIndexSpellcastingGet(index, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		}
	};
};

/**
 * ClassApi - factory interface
 * @export
 */
export const ClassApiFactory = function (
	configuration?: Configuration,
	fetch?: FetchAPI,
	basePath?: string
) {
	return {
		/**
		 * # Class  A character class is a fundamental part of the identity and nature of characters in the Dungeons & Dragons role-playing game. A character's capabilities, strengths, and weaknesses are largely defined by its class. A character's class affects a character's available skills and abilities. [[SRD p8-55](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=8)]
		 * @summary Get a class by index.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexGet(index: string, options?: any) {
			return ClassApiFp(configuration).apiClassesIndexGet(index, options)(fetch, basePath);
		},
		/**
		 *
		 * @summary Get multiclassing resource for a class.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexMultiClassingGet(index: string, options?: any) {
			return ClassApiFp(configuration).apiClassesIndexMultiClassingGet(index, options)(
				fetch,
				basePath
			);
		},
		/**
		 *
		 * @summary Get spellcasting info for a class.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexSpellcastingGet(index: string, options?: any) {
			return ClassApiFp(configuration).apiClassesIndexSpellcastingGet(index, options)(
				fetch,
				basePath
			);
		}
	};
};

/**
 * ClassApi - object-oriented interface
 * @export
 * @class ClassApi
 * @extends {BaseAPI}
 */
export class ClassApi extends BaseAPI {
	/**
	 * # Class  A character class is a fundamental part of the identity and nature of characters in the Dungeons & Dragons role-playing game. A character's capabilities, strengths, and weaknesses are largely defined by its class. A character's class affects a character's available skills and abilities. [[SRD p8-55](https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf#page=8)]
	 * @summary Get a class by index.
	 * @param {string} index The &#x60;index&#x60; of the class to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ClassApi
	 */
	public apiClassesIndexGet(index: string, options?: any) {
		return ClassApiFp(this.configuration).apiClassesIndexGet(index, options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 *
	 * @summary Get multiclassing resource for a class.
	 * @param {string} index The &#x60;index&#x60; of the class to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ClassApi
	 */
	public apiClassesIndexMultiClassingGet(index: string, options?: any) {
		return ClassApiFp(this.configuration).apiClassesIndexMultiClassingGet(index, options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 *
	 * @summary Get spellcasting info for a class.
	 * @param {string} index The &#x60;index&#x60; of the class to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ClassApi
	 */
	public apiClassesIndexSpellcastingGet(index: string, options?: any) {
		return ClassApiFp(this.configuration).apiClassesIndexSpellcastingGet(index, options)(
			this.fetch,
			this.basePath
		);
	}
}
/**
 * ClassLevelsApi - fetch parameter creator
 * @export
 */
export const ClassLevelsApiFetchParamCreator = function (configuration?: Configuration) {
	return {
		/**
		 *
		 * @summary Get features available to a class at the requested level.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {number} classLevel
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexLevelsClassLevelFeaturesGet(
			index: string,
			classLevel: number,
			options: any = {}
		): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiClassesIndexLevelsClassLevelFeaturesGet.'
				);
			}
			// verify required parameter 'classLevel' is not null or undefined
			if (classLevel === null || classLevel === undefined) {
				throw new RequiredError(
					'classLevel',
					'Required parameter classLevel was null or undefined when calling apiClassesIndexLevelsClassLevelFeaturesGet.'
				);
			}
			const localVarPath = `/api/classes/{index}/levels/{class_level}/features`
				.replace(`{${'index'}}`, encodeURIComponent(String(index)))
				.replace(`{${'class_level'}}`, encodeURIComponent(String(classLevel)));
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 *
		 * @summary Get level resource for a class and level.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {number} classLevel
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexLevelsClassLevelGet(
			index: string,
			classLevel: number,
			options: any = {}
		): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiClassesIndexLevelsClassLevelGet.'
				);
			}
			// verify required parameter 'classLevel' is not null or undefined
			if (classLevel === null || classLevel === undefined) {
				throw new RequiredError(
					'classLevel',
					'Required parameter classLevel was null or undefined when calling apiClassesIndexLevelsClassLevelGet.'
				);
			}
			const localVarPath = `/api/classes/{index}/levels/{class_level}`
				.replace(`{${'index'}}`, encodeURIComponent(String(index)))
				.replace(`{${'class_level'}}`, encodeURIComponent(String(classLevel)));
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 *
		 * @summary Get all level resources for a class.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {string} [subclass] Adds subclasses for class to the response
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexLevelsGet(index: string, subclass?: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiClassesIndexLevelsGet.'
				);
			}
			const localVarPath = `/api/classes/{index}/levels`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			if (subclass !== undefined) {
				localVarQueryParameter['subclass'] = subclass;
			}

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 *
		 * @summary Get spells of the requested level available to the class.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {number} spellLevel
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexLevelsSpellLevelSpellsGet(
			index: string,
			spellLevel: number,
			options: any = {}
		): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiClassesIndexLevelsSpellLevelSpellsGet.'
				);
			}
			// verify required parameter 'spellLevel' is not null or undefined
			if (spellLevel === null || spellLevel === undefined) {
				throw new RequiredError(
					'spellLevel',
					'Required parameter spellLevel was null or undefined when calling apiClassesIndexLevelsSpellLevelSpellsGet.'
				);
			}
			const localVarPath = `/api/classes/{index}/levels/{spell_level}/spells`
				.replace(`{${'index'}}`, encodeURIComponent(String(index)))
				.replace(`{${'spell_level'}}`, encodeURIComponent(String(spellLevel)));
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		}
	};
};

/**
 * ClassLevelsApi - functional programming interface
 * @export
 */
export const ClassLevelsApiFp = function (configuration?: Configuration) {
	return {
		/**
		 *
		 * @summary Get features available to a class at the requested level.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {number} classLevel
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexLevelsClassLevelFeaturesGet(
			index: string,
			classLevel: number,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<APIReferenceList> {
			const localVarFetchArgs = ClassLevelsApiFetchParamCreator(
				configuration
			).apiClassesIndexLevelsClassLevelFeaturesGet(index, classLevel, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 *
		 * @summary Get level resource for a class and level.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {number} classLevel
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexLevelsClassLevelGet(
			index: string,
			classLevel: number,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<ClassLevel> {
			const localVarFetchArgs = ClassLevelsApiFetchParamCreator(
				configuration
			).apiClassesIndexLevelsClassLevelGet(index, classLevel, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 *
		 * @summary Get all level resources for a class.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {string} [subclass] Adds subclasses for class to the response
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexLevelsGet(
			index: string,
			subclass?: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<Array<ClassLevel>> {
			const localVarFetchArgs = ClassLevelsApiFetchParamCreator(
				configuration
			).apiClassesIndexLevelsGet(index, subclass, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 *
		 * @summary Get spells of the requested level available to the class.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {number} spellLevel
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexLevelsSpellLevelSpellsGet(
			index: string,
			spellLevel: number,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<APIReferenceList> {
			const localVarFetchArgs = ClassLevelsApiFetchParamCreator(
				configuration
			).apiClassesIndexLevelsSpellLevelSpellsGet(index, spellLevel, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		}
	};
};

/**
 * ClassLevelsApi - factory interface
 * @export
 */
export const ClassLevelsApiFactory = function (
	configuration?: Configuration,
	fetch?: FetchAPI,
	basePath?: string
) {
	return {
		/**
		 *
		 * @summary Get features available to a class at the requested level.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {number} classLevel
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexLevelsClassLevelFeaturesGet(index: string, classLevel: number, options?: any) {
			return ClassLevelsApiFp(configuration).apiClassesIndexLevelsClassLevelFeaturesGet(
				index,
				classLevel,
				options
			)(fetch, basePath);
		},
		/**
		 *
		 * @summary Get level resource for a class and level.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {number} classLevel
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexLevelsClassLevelGet(index: string, classLevel: number, options?: any) {
			return ClassLevelsApiFp(configuration).apiClassesIndexLevelsClassLevelGet(
				index,
				classLevel,
				options
			)(fetch, basePath);
		},
		/**
		 *
		 * @summary Get all level resources for a class.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {string} [subclass] Adds subclasses for class to the response
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexLevelsGet(index: string, subclass?: string, options?: any) {
			return ClassLevelsApiFp(configuration).apiClassesIndexLevelsGet(
				index,
				subclass,
				options
			)(fetch, basePath);
		},
		/**
		 *
		 * @summary Get spells of the requested level available to the class.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {number} spellLevel
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexLevelsSpellLevelSpellsGet(index: string, spellLevel: number, options?: any) {
			return ClassLevelsApiFp(configuration).apiClassesIndexLevelsSpellLevelSpellsGet(
				index,
				spellLevel,
				options
			)(fetch, basePath);
		}
	};
};

/**
 * ClassLevelsApi - object-oriented interface
 * @export
 * @class ClassLevelsApi
 * @extends {BaseAPI}
 */
export class ClassLevelsApi extends BaseAPI {
	/**
	 *
	 * @summary Get features available to a class at the requested level.
	 * @param {string} index The &#x60;index&#x60; of the class to get.
	 * @param {number} classLevel
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ClassLevelsApi
	 */
	public apiClassesIndexLevelsClassLevelFeaturesGet(
		index: string,
		classLevel: number,
		options?: any
	) {
		return ClassLevelsApiFp(this.configuration).apiClassesIndexLevelsClassLevelFeaturesGet(
			index,
			classLevel,
			options
		)(this.fetch, this.basePath);
	}

	/**
	 *
	 * @summary Get level resource for a class and level.
	 * @param {string} index The &#x60;index&#x60; of the class to get.
	 * @param {number} classLevel
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ClassLevelsApi
	 */
	public apiClassesIndexLevelsClassLevelGet(index: string, classLevel: number, options?: any) {
		return ClassLevelsApiFp(this.configuration).apiClassesIndexLevelsClassLevelGet(
			index,
			classLevel,
			options
		)(this.fetch, this.basePath);
	}

	/**
	 *
	 * @summary Get all level resources for a class.
	 * @param {string} index The &#x60;index&#x60; of the class to get.
	 * @param {string} [subclass] Adds subclasses for class to the response
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ClassLevelsApi
	 */
	public apiClassesIndexLevelsGet(index: string, subclass?: string, options?: any) {
		return ClassLevelsApiFp(this.configuration).apiClassesIndexLevelsGet(
			index,
			subclass,
			options
		)(this.fetch, this.basePath);
	}

	/**
	 *
	 * @summary Get spells of the requested level available to the class.
	 * @param {string} index The &#x60;index&#x60; of the class to get.
	 * @param {number} spellLevel
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ClassLevelsApi
	 */
	public apiClassesIndexLevelsSpellLevelSpellsGet(
		index: string,
		spellLevel: number,
		options?: any
	) {
		return ClassLevelsApiFp(this.configuration).apiClassesIndexLevelsSpellLevelSpellsGet(
			index,
			spellLevel,
			options
		)(this.fetch, this.basePath);
	}
}
/**
 * ClassResourceListsApi - fetch parameter creator
 * @export
 */
export const ClassResourceListsApiFetchParamCreator = function (configuration?: Configuration) {
	return {
		/**
		 *
		 * @summary Get features available for a class.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexFeaturesGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiClassesIndexFeaturesGet.'
				);
			}
			const localVarPath = `/api/classes/{index}/features`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 *
		 * @summary Get proficiencies available for a class.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexProficienciesGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiClassesIndexProficienciesGet.'
				);
			}
			const localVarPath = `/api/classes/{index}/proficiencies`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 *
		 * @summary Get spells available for a class.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexSpellsGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiClassesIndexSpellsGet.'
				);
			}
			const localVarPath = `/api/classes/{index}/spells`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 *
		 * @summary Get subclasses available for a class.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexSubclassesGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiClassesIndexSubclassesGet.'
				);
			}
			const localVarPath = `/api/classes/{index}/subclasses`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		}
	};
};

/**
 * ClassResourceListsApi - functional programming interface
 * @export
 */
export const ClassResourceListsApiFp = function (configuration?: Configuration) {
	return {
		/**
		 *
		 * @summary Get features available for a class.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexFeaturesGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<APIReferenceList> {
			const localVarFetchArgs = ClassResourceListsApiFetchParamCreator(
				configuration
			).apiClassesIndexFeaturesGet(index, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 *
		 * @summary Get proficiencies available for a class.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexProficienciesGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<APIReferenceList> {
			const localVarFetchArgs = ClassResourceListsApiFetchParamCreator(
				configuration
			).apiClassesIndexProficienciesGet(index, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 *
		 * @summary Get spells available for a class.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexSpellsGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<APIReferenceList> {
			const localVarFetchArgs = ClassResourceListsApiFetchParamCreator(
				configuration
			).apiClassesIndexSpellsGet(index, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 *
		 * @summary Get subclasses available for a class.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexSubclassesGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<APIReferenceList> {
			const localVarFetchArgs = ClassResourceListsApiFetchParamCreator(
				configuration
			).apiClassesIndexSubclassesGet(index, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		}
	};
};

/**
 * ClassResourceListsApi - factory interface
 * @export
 */
export const ClassResourceListsApiFactory = function (
	configuration?: Configuration,
	fetch?: FetchAPI,
	basePath?: string
) {
	return {
		/**
		 *
		 * @summary Get features available for a class.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexFeaturesGet(index: string, options?: any) {
			return ClassResourceListsApiFp(configuration).apiClassesIndexFeaturesGet(index, options)(
				fetch,
				basePath
			);
		},
		/**
		 *
		 * @summary Get proficiencies available for a class.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexProficienciesGet(index: string, options?: any) {
			return ClassResourceListsApiFp(configuration).apiClassesIndexProficienciesGet(index, options)(
				fetch,
				basePath
			);
		},
		/**
		 *
		 * @summary Get spells available for a class.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexSpellsGet(index: string, options?: any) {
			return ClassResourceListsApiFp(configuration).apiClassesIndexSpellsGet(index, options)(
				fetch,
				basePath
			);
		},
		/**
		 *
		 * @summary Get subclasses available for a class.
		 * @param {string} index The &#x60;index&#x60; of the class to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiClassesIndexSubclassesGet(index: string, options?: any) {
			return ClassResourceListsApiFp(configuration).apiClassesIndexSubclassesGet(index, options)(
				fetch,
				basePath
			);
		}
	};
};

/**
 * ClassResourceListsApi - object-oriented interface
 * @export
 * @class ClassResourceListsApi
 * @extends {BaseAPI}
 */
export class ClassResourceListsApi extends BaseAPI {
	/**
	 *
	 * @summary Get features available for a class.
	 * @param {string} index The &#x60;index&#x60; of the class to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ClassResourceListsApi
	 */
	public apiClassesIndexFeaturesGet(index: string, options?: any) {
		return ClassResourceListsApiFp(this.configuration).apiClassesIndexFeaturesGet(index, options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 *
	 * @summary Get proficiencies available for a class.
	 * @param {string} index The &#x60;index&#x60; of the class to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ClassResourceListsApi
	 */
	public apiClassesIndexProficienciesGet(index: string, options?: any) {
		return ClassResourceListsApiFp(this.configuration).apiClassesIndexProficienciesGet(
			index,
			options
		)(this.fetch, this.basePath);
	}

	/**
	 *
	 * @summary Get spells available for a class.
	 * @param {string} index The &#x60;index&#x60; of the class to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ClassResourceListsApi
	 */
	public apiClassesIndexSpellsGet(index: string, options?: any) {
		return ClassResourceListsApiFp(this.configuration).apiClassesIndexSpellsGet(index, options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 *
	 * @summary Get subclasses available for a class.
	 * @param {string} index The &#x60;index&#x60; of the class to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof ClassResourceListsApi
	 */
	public apiClassesIndexSubclassesGet(index: string, options?: any) {
		return ClassResourceListsApiFp(this.configuration).apiClassesIndexSubclassesGet(index, options)(
			this.fetch,
			this.basePath
		);
	}
}
/**
 * CommonApi - fetch parameter creator
 * @export
 */
export const CommonApiFetchParamCreator = function (configuration?: Configuration) {
	return {
		/**
		 * Currently only the [`/spells`](#get-/api/spells) and [`/monsters`](#get-/api/monsters) endpoints support filtering with query parameters. Use of these query parameters is documented under the respective [Spells](#tag--Spells) and [Monsters](#tag--Monsters) sections.
		 * @summary Get list of all available resources for an endpoint.
		 * @param {string} endpoint
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiEndpointGet(endpoint: string, options: any = {}): FetchArgs {
			// verify required parameter 'endpoint' is not null or undefined
			if (endpoint === null || endpoint === undefined) {
				throw new RequiredError(
					'endpoint',
					'Required parameter endpoint was null or undefined when calling apiEndpointGet.'
				);
			}
			const localVarPath = `/api/{endpoint}`.replace(
				`{${'endpoint'}}`,
				encodeURIComponent(String(endpoint))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 * Making a request to the API's base URL returns an object containing available endpoints.
		 * @summary Get all resource URLs.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiGet(options: any = {}): FetchArgs {
			const localVarPath = `/api`;
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		}
	};
};

/**
 * CommonApi - functional programming interface
 * @export
 */
export const CommonApiFp = function (configuration?: Configuration) {
	return {
		/**
		 * Currently only the [`/spells`](#get-/api/spells) and [`/monsters`](#get-/api/monsters) endpoints support filtering with query parameters. Use of these query parameters is documented under the respective [Spells](#tag--Spells) and [Monsters](#tag--Monsters) sections.
		 * @summary Get list of all available resources for an endpoint.
		 * @param {string} endpoint
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiEndpointGet(
			endpoint: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<APIReferenceList> {
			const localVarFetchArgs = CommonApiFetchParamCreator(configuration).apiEndpointGet(
				endpoint,
				options
			);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 * Making a request to the API's base URL returns an object containing available endpoints.
		 * @summary Get all resource URLs.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiGet(
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<{ [key: string]: string }> {
			const localVarFetchArgs = CommonApiFetchParamCreator(configuration).apiGet(options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		}
	};
};

/**
 * CommonApi - factory interface
 * @export
 */
export const CommonApiFactory = function (
	configuration?: Configuration,
	fetch?: FetchAPI,
	basePath?: string
) {
	return {
		/**
		 * Currently only the [`/spells`](#get-/api/spells) and [`/monsters`](#get-/api/monsters) endpoints support filtering with query parameters. Use of these query parameters is documented under the respective [Spells](#tag--Spells) and [Monsters](#tag--Monsters) sections.
		 * @summary Get list of all available resources for an endpoint.
		 * @param {string} endpoint
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiEndpointGet(endpoint: string, options?: any) {
			return CommonApiFp(configuration).apiEndpointGet(endpoint, options)(fetch, basePath);
		},
		/**
		 * Making a request to the API's base URL returns an object containing available endpoints.
		 * @summary Get all resource URLs.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiGet(options?: any) {
			return CommonApiFp(configuration).apiGet(options)(fetch, basePath);
		}
	};
};

/**
 * CommonApi - object-oriented interface
 * @export
 * @class CommonApi
 * @extends {BaseAPI}
 */
export class CommonApi extends BaseAPI {
	/**
	 * Currently only the [`/spells`](#get-/api/spells) and [`/monsters`](#get-/api/monsters) endpoints support filtering with query parameters. Use of these query parameters is documented under the respective [Spells](#tag--Spells) and [Monsters](#tag--Monsters) sections.
	 * @summary Get list of all available resources for an endpoint.
	 * @param {string} endpoint
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof CommonApi
	 */
	public apiEndpointGet(endpoint: string, options?: any) {
		return CommonApiFp(this.configuration).apiEndpointGet(endpoint, options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 * Making a request to the API's base URL returns an object containing available endpoints.
	 * @summary Get all resource URLs.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof CommonApi
	 */
	public apiGet(options?: any) {
		return CommonApiFp(this.configuration).apiGet(options)(this.fetch, this.basePath);
	}
}
/**
 * EquipmentApi - fetch parameter creator
 * @export
 */
export const EquipmentApiFetchParamCreator = function (configuration?: Configuration) {
	return {
		/**
		 * These are the categories that various equipment fall under.
		 * @summary Get an equipment category by index.
		 * @param {string} index The &#x60;index&#x60; of the equipment category score to get.  Available values can be found in the resource list for this endpoint.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiEquipmentCategoriesIndexGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiEquipmentCategoriesIndexGet.'
				);
			}
			const localVarPath = `/api/equipment-categories/{index}`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 * # Equipment  Opportunities abound to find treasure, equipment, weapons, armor, and more  in the dungeons you explore. Normally, you can sell your treasures and  trinkets when you return to a town or other settlement, provided that you  can find buyers and merchants interested in your loot.
		 * @summary Get an equipment item by index.
		 * @param {string} index The &#x60;index&#x60; of the equipment to get.  Available values can be found in the [&#x60;ResourceList&#x60;](#get-/api/-endpoint-) for &#x60;equipment&#x60;.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiEquipmentIndexGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiEquipmentIndexGet.'
				);
			}
			const localVarPath = `/api/equipment/{index}`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 * These are the various magic items you can find in the game.
		 * @summary Get a magic item by index.
		 * @param {string} index The &#x60;index&#x60; of the magic item to get.  Available values can be found in the resource list for this endpoint.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiMagicItemsIndexGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiMagicItemsIndexGet.'
				);
			}
			const localVarPath = `/api/magic-items/{index}`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 *
		 * @summary Get a weapon property by index.
		 * @param {string} index The &#x60;index&#x60; of the weapon property to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiWeaponPropertiesIndexGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiWeaponPropertiesIndexGet.'
				);
			}
			const localVarPath = `/api/weapon-properties/{index}`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		}
	};
};

/**
 * EquipmentApi - functional programming interface
 * @export
 */
export const EquipmentApiFp = function (configuration?: Configuration) {
	return {
		/**
		 * These are the categories that various equipment fall under.
		 * @summary Get an equipment category by index.
		 * @param {string} index The &#x60;index&#x60; of the equipment category score to get.  Available values can be found in the resource list for this endpoint.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiEquipmentCategoriesIndexGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<EquipmentCategory> {
			const localVarFetchArgs = EquipmentApiFetchParamCreator(
				configuration
			).apiEquipmentCategoriesIndexGet(index, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 * # Equipment  Opportunities abound to find treasure, equipment, weapons, armor, and more  in the dungeons you explore. Normally, you can sell your treasures and  trinkets when you return to a town or other settlement, provided that you  can find buyers and merchants interested in your loot.
		 * @summary Get an equipment item by index.
		 * @param {string} index The &#x60;index&#x60; of the equipment to get.  Available values can be found in the [&#x60;ResourceList&#x60;](#get-/api/-endpoint-) for &#x60;equipment&#x60;.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiEquipmentIndexGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<Equipment> {
			const localVarFetchArgs = EquipmentApiFetchParamCreator(configuration).apiEquipmentIndexGet(
				index,
				options
			);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 * These are the various magic items you can find in the game.
		 * @summary Get a magic item by index.
		 * @param {string} index The &#x60;index&#x60; of the magic item to get.  Available values can be found in the resource list for this endpoint.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiMagicItemsIndexGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<MagicItem> {
			const localVarFetchArgs = EquipmentApiFetchParamCreator(configuration).apiMagicItemsIndexGet(
				index,
				options
			);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 *
		 * @summary Get a weapon property by index.
		 * @param {string} index The &#x60;index&#x60; of the weapon property to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiWeaponPropertiesIndexGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<WeaponProperty> {
			const localVarFetchArgs = EquipmentApiFetchParamCreator(
				configuration
			).apiWeaponPropertiesIndexGet(index, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		}
	};
};

/**
 * EquipmentApi - factory interface
 * @export
 */
export const EquipmentApiFactory = function (
	configuration?: Configuration,
	fetch?: FetchAPI,
	basePath?: string
) {
	return {
		/**
		 * These are the categories that various equipment fall under.
		 * @summary Get an equipment category by index.
		 * @param {string} index The &#x60;index&#x60; of the equipment category score to get.  Available values can be found in the resource list for this endpoint.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiEquipmentCategoriesIndexGet(index: string, options?: any) {
			return EquipmentApiFp(configuration).apiEquipmentCategoriesIndexGet(index, options)(
				fetch,
				basePath
			);
		},
		/**
		 * # Equipment  Opportunities abound to find treasure, equipment, weapons, armor, and more  in the dungeons you explore. Normally, you can sell your treasures and  trinkets when you return to a town or other settlement, provided that you  can find buyers and merchants interested in your loot.
		 * @summary Get an equipment item by index.
		 * @param {string} index The &#x60;index&#x60; of the equipment to get.  Available values can be found in the [&#x60;ResourceList&#x60;](#get-/api/-endpoint-) for &#x60;equipment&#x60;.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiEquipmentIndexGet(index: string, options?: any) {
			return EquipmentApiFp(configuration).apiEquipmentIndexGet(index, options)(fetch, basePath);
		},
		/**
		 * These are the various magic items you can find in the game.
		 * @summary Get a magic item by index.
		 * @param {string} index The &#x60;index&#x60; of the magic item to get.  Available values can be found in the resource list for this endpoint.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiMagicItemsIndexGet(index: string, options?: any) {
			return EquipmentApiFp(configuration).apiMagicItemsIndexGet(index, options)(fetch, basePath);
		},
		/**
		 *
		 * @summary Get a weapon property by index.
		 * @param {string} index The &#x60;index&#x60; of the weapon property to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiWeaponPropertiesIndexGet(index: string, options?: any) {
			return EquipmentApiFp(configuration).apiWeaponPropertiesIndexGet(index, options)(
				fetch,
				basePath
			);
		}
	};
};

/**
 * EquipmentApi - object-oriented interface
 * @export
 * @class EquipmentApi
 * @extends {BaseAPI}
 */
export class EquipmentApi extends BaseAPI {
	/**
	 * These are the categories that various equipment fall under.
	 * @summary Get an equipment category by index.
	 * @param {string} index The &#x60;index&#x60; of the equipment category score to get.  Available values can be found in the resource list for this endpoint.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof EquipmentApi
	 */
	public apiEquipmentCategoriesIndexGet(index: string, options?: any) {
		return EquipmentApiFp(this.configuration).apiEquipmentCategoriesIndexGet(index, options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 * # Equipment  Opportunities abound to find treasure, equipment, weapons, armor, and more  in the dungeons you explore. Normally, you can sell your treasures and  trinkets when you return to a town or other settlement, provided that you  can find buyers and merchants interested in your loot.
	 * @summary Get an equipment item by index.
	 * @param {string} index The &#x60;index&#x60; of the equipment to get.  Available values can be found in the [&#x60;ResourceList&#x60;](#get-/api/-endpoint-) for &#x60;equipment&#x60;.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof EquipmentApi
	 */
	public apiEquipmentIndexGet(index: string, options?: any) {
		return EquipmentApiFp(this.configuration).apiEquipmentIndexGet(index, options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 * These are the various magic items you can find in the game.
	 * @summary Get a magic item by index.
	 * @param {string} index The &#x60;index&#x60; of the magic item to get.  Available values can be found in the resource list for this endpoint.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof EquipmentApi
	 */
	public apiMagicItemsIndexGet(index: string, options?: any) {
		return EquipmentApiFp(this.configuration).apiMagicItemsIndexGet(index, options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 *
	 * @summary Get a weapon property by index.
	 * @param {string} index The &#x60;index&#x60; of the weapon property to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof EquipmentApi
	 */
	public apiWeaponPropertiesIndexGet(index: string, options?: any) {
		return EquipmentApiFp(this.configuration).apiWeaponPropertiesIndexGet(index, options)(
			this.fetch,
			this.basePath
		);
	}
}
/**
 * FeatsApi - fetch parameter creator
 * @export
 */
export const FeatsApiFetchParamCreator = function (configuration?: Configuration) {
	return {
		/**
		 * # Feat   A feat is a boon a character can receive at level up instead of an ability score increase.
		 * @summary Get a feat by index.
		 * @param {string} index The &#x60;index&#x60; of the feat to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiFeatsIndexGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiFeatsIndexGet.'
				);
			}
			const localVarPath = `/api/feats/{index}`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		}
	};
};

/**
 * FeatsApi - functional programming interface
 * @export
 */
export const FeatsApiFp = function (configuration?: Configuration) {
	return {
		/**
		 * # Feat   A feat is a boon a character can receive at level up instead of an ability score increase.
		 * @summary Get a feat by index.
		 * @param {string} index The &#x60;index&#x60; of the feat to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiFeatsIndexGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<Feat> {
			const localVarFetchArgs = FeatsApiFetchParamCreator(configuration).apiFeatsIndexGet(
				index,
				options
			);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		}
	};
};

/**
 * FeatsApi - factory interface
 * @export
 */
export const FeatsApiFactory = function (
	configuration?: Configuration,
	fetch?: FetchAPI,
	basePath?: string
) {
	return {
		/**
		 * # Feat   A feat is a boon a character can receive at level up instead of an ability score increase.
		 * @summary Get a feat by index.
		 * @param {string} index The &#x60;index&#x60; of the feat to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiFeatsIndexGet(index: string, options?: any) {
			return FeatsApiFp(configuration).apiFeatsIndexGet(index, options)(fetch, basePath);
		}
	};
};

/**
 * FeatsApi - object-oriented interface
 * @export
 * @class FeatsApi
 * @extends {BaseAPI}
 */
export class FeatsApi extends BaseAPI {
	/**
	 * # Feat   A feat is a boon a character can receive at level up instead of an ability score increase.
	 * @summary Get a feat by index.
	 * @param {string} index The &#x60;index&#x60; of the feat to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof FeatsApi
	 */
	public apiFeatsIndexGet(index: string, options?: any) {
		return FeatsApiFp(this.configuration).apiFeatsIndexGet(index, options)(
			this.fetch,
			this.basePath
		);
	}
}
/**
 * FeaturesApi - fetch parameter creator
 * @export
 */
export const FeaturesApiFetchParamCreator = function (configuration?: Configuration) {
	return {
		/**
		 * # Feature   When you gain a new level in a class, you get its features for that level.  You don’t, however, receive the class’s starting Equipment, and a few  features have additional rules when you’re multiclassing: Channel Divinity,  Extra Attack, Unarmored Defense, and Spellcasting.
		 * @summary Get a feature by index.
		 * @param {string} index The &#x60;index&#x60; of the feature to get.  Available values can be found in the [&#x60;ResourceList&#x60;](#get-/api/-endpoint-) for &#x60;features&#x60;.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiFeaturesIndexGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiFeaturesIndexGet.'
				);
			}
			const localVarPath = `/api/features/{index}`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		}
	};
};

/**
 * FeaturesApi - functional programming interface
 * @export
 */
export const FeaturesApiFp = function (configuration?: Configuration) {
	return {
		/**
		 * # Feature   When you gain a new level in a class, you get its features for that level.  You don’t, however, receive the class’s starting Equipment, and a few  features have additional rules when you’re multiclassing: Channel Divinity,  Extra Attack, Unarmored Defense, and Spellcasting.
		 * @summary Get a feature by index.
		 * @param {string} index The &#x60;index&#x60; of the feature to get.  Available values can be found in the [&#x60;ResourceList&#x60;](#get-/api/-endpoint-) for &#x60;features&#x60;.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiFeaturesIndexGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<Feature> {
			const localVarFetchArgs = FeaturesApiFetchParamCreator(configuration).apiFeaturesIndexGet(
				index,
				options
			);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		}
	};
};

/**
 * FeaturesApi - factory interface
 * @export
 */
export const FeaturesApiFactory = function (
	configuration?: Configuration,
	fetch?: FetchAPI,
	basePath?: string
) {
	return {
		/**
		 * # Feature   When you gain a new level in a class, you get its features for that level.  You don’t, however, receive the class’s starting Equipment, and a few  features have additional rules when you’re multiclassing: Channel Divinity,  Extra Attack, Unarmored Defense, and Spellcasting.
		 * @summary Get a feature by index.
		 * @param {string} index The &#x60;index&#x60; of the feature to get.  Available values can be found in the [&#x60;ResourceList&#x60;](#get-/api/-endpoint-) for &#x60;features&#x60;.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiFeaturesIndexGet(index: string, options?: any) {
			return FeaturesApiFp(configuration).apiFeaturesIndexGet(index, options)(fetch, basePath);
		}
	};
};

/**
 * FeaturesApi - object-oriented interface
 * @export
 * @class FeaturesApi
 * @extends {BaseAPI}
 */
export class FeaturesApi extends BaseAPI {
	/**
	 * # Feature   When you gain a new level in a class, you get its features for that level.  You don’t, however, receive the class’s starting Equipment, and a few  features have additional rules when you’re multiclassing: Channel Divinity,  Extra Attack, Unarmored Defense, and Spellcasting.
	 * @summary Get a feature by index.
	 * @param {string} index The &#x60;index&#x60; of the feature to get.  Available values can be found in the [&#x60;ResourceList&#x60;](#get-/api/-endpoint-) for &#x60;features&#x60;.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof FeaturesApi
	 */
	public apiFeaturesIndexGet(index: string, options?: any) {
		return FeaturesApiFp(this.configuration).apiFeaturesIndexGet(index, options)(
			this.fetch,
			this.basePath
		);
	}
}
/**
 * GameMechanicsApi - fetch parameter creator
 * @export
 */
export const GameMechanicsApiFetchParamCreator = function (configuration?: Configuration) {
	return {
		/**
		 * # Condition  A condition alters a creature’s capabilities in a variety of ways and can  arise as a result of a spell, a class feature, a monster’s attack, or other  effect. Most conditions, such as blinded, are impairments, but a few, such  as invisible, can be advantageous.
		 * @summary Get a condition by index.
		 * @param {string} index The &#x60;index&#x60; of the condition to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiConditionsIndexGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiConditionsIndexGet.'
				);
			}
			const localVarPath = `/api/conditions/{index}`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},

		/**
		 * # Damage type  Different attacks, damaging spells, and other harmful effects deal different  types of damage. Damage types have no rules of their own, but other rules,  such as damage resistance, rely on the types.
		 * @summary Get a damage type by index.
		 * @param {string} index The &#x60;index&#x60; of the damage type to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiDamageTypesGet(options: any = {}): FetchArgs {
			const localVarPath = `/api/damage-types`;
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 * # Damage type  Different attacks, damaging spells, and other harmful effects deal different  types of damage. Damage types have no rules of their own, but other rules,  such as damage resistance, rely on the types.
		 * @summary Get a damage type by index.
		 * @param {string} index The &#x60;index&#x60; of the damage type to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiDamageTypesIndexGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiDamageTypesIndexGet.'
				);
			}
			const localVarPath = `/api/damage-types/{index}`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 * # Magic School  Academies of magic group spells into eight categories called schools of  magic. Scholars, particularly wizards, apply these categories to all spells,  believing that all magic functions in essentially the same way, whether it  derives from rigorous study or is bestowed by a deity.
		 * @summary Get a magic school by index.
		 * @param {string} index The &#x60;index&#x60; of the magic school to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiMagicSchoolsIndexGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiMagicSchoolsIndexGet.'
				);
			}
			const localVarPath = `/api/magic-schools/{index}`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		}
	};
};

/**
 * GameMechanicsApi - functional programming interface
 * @export
 */
export const GameMechanicsApiFp = function (configuration?: Configuration) {
	return {
		/**
		 * # Condition  A condition alters a creature’s capabilities in a variety of ways and can  arise as a result of a spell, a class feature, a monster’s attack, or other  effect. Most conditions, such as blinded, are impairments, but a few, such  as invisible, can be advantageous.
		 * @summary Get a condition by index.
		 * @param {string} index The &#x60;index&#x60; of the condition to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiConditionsIndexGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<Condition> {
			const localVarFetchArgs = GameMechanicsApiFetchParamCreator(
				configuration
			).apiConditionsIndexGet(index, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},

		/**
		 * # Damage type  Different attacks, damaging spells, and other harmful effects deal different  types of damage. Damage types have no rules of their own, but other rules,  such as damage resistance, rely on the types.
		 * @summary Get a damage type by index.
		 * @param {string} index The &#x60;index&#x60; of the damage type to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiDamageTypesGet(
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<DamageType[]> {
			const localVarFetchArgs =
				GameMechanicsApiFetchParamCreator(configuration).apiDamageTypesGet(options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},

		/**
		 * # Damage type  Different attacks, damaging spells, and other harmful effects deal different  types of damage. Damage types have no rules of their own, but other rules,  such as damage resistance, rely on the types.
		 * @summary Get a damage type by index.
		 * @param {string} index The &#x60;index&#x60; of the damage type to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiDamageTypesIndexGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<DamageType> {
			const localVarFetchArgs = GameMechanicsApiFetchParamCreator(
				configuration
			).apiDamageTypesIndexGet(index, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 * # Magic School  Academies of magic group spells into eight categories called schools of  magic. Scholars, particularly wizards, apply these categories to all spells,  believing that all magic functions in essentially the same way, whether it  derives from rigorous study or is bestowed by a deity.
		 * @summary Get a magic school by index.
		 * @param {string} index The &#x60;index&#x60; of the magic school to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiMagicSchoolsIndexGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<MagicSchool> {
			const localVarFetchArgs = GameMechanicsApiFetchParamCreator(
				configuration
			).apiMagicSchoolsIndexGet(index, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		}
	};
};

/**
 * GameMechanicsApi - factory interface
 * @export
 */
export const GameMechanicsApiFactory = function (
	configuration?: Configuration,
	fetch?: FetchAPI,
	basePath?: string
) {
	return {
		/**
		 * # Condition  A condition alters a creature’s capabilities in a variety of ways and can  arise as a result of a spell, a class feature, a monster’s attack, or other  effect. Most conditions, such as blinded, are impairments, but a few, such  as invisible, can be advantageous.
		 * @summary Get a condition by index.
		 * @param {string} index The &#x60;index&#x60; of the condition to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiConditionsIndexGet(index: string, options?: any) {
			return GameMechanicsApiFp(configuration).apiConditionsIndexGet(index, options)(
				fetch,
				basePath
			);
		},
		/**
		 * # Damage type  Different attacks, damaging spells, and other harmful effects deal different  types of damage. Damage types have no rules of their own, but other rules,  such as damage resistance, rely on the types.
		 * @summary Get a damage type by index.
		 * @param {string} index The &#x60;index&#x60; of the damage type to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiDamageTypesIndexGet(index: string, options?: any) {
			return GameMechanicsApiFp(configuration).apiDamageTypesIndexGet(index, options)(
				fetch,
				basePath
			);
		},
		/**
		 * # Magic School  Academies of magic group spells into eight categories called schools of  magic. Scholars, particularly wizards, apply these categories to all spells,  believing that all magic functions in essentially the same way, whether it  derives from rigorous study or is bestowed by a deity.
		 * @summary Get a magic school by index.
		 * @param {string} index The &#x60;index&#x60; of the magic school to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiMagicSchoolsIndexGet(index: string, options?: any) {
			return GameMechanicsApiFp(configuration).apiMagicSchoolsIndexGet(index, options)(
				fetch,
				basePath
			);
		}
	};
};

/**
 * GameMechanicsApi - object-oriented interface
 * @export
 * @class GameMechanicsApi
 * @extends {BaseAPI}
 */
export class GameMechanicsApi extends BaseAPI {
	/**
	 * # Condition  A condition alters a creature’s capabilities in a variety of ways and can  arise as a result of a spell, a class feature, a monster’s attack, or other  effect. Most conditions, such as blinded, are impairments, but a few, such  as invisible, can be advantageous.
	 * @summary Get a condition by index.
	 * @param {string} index The &#x60;index&#x60; of the condition to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof GameMechanicsApi
	 */
	public apiConditionsIndexGet(index: string, options?: any) {
		return GameMechanicsApiFp(this.configuration).apiConditionsIndexGet(index, options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 * # Damage type  Different attacks, damaging spells, and other harmful effects deal different  types of damage. Damage types have no rules of their own, but other rules,  such as damage resistance, rely on the types.
	 * @summary Get a damage type by index.
	 * @param {string} index The &#x60;index&#x60; of the damage type to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof GameMechanicsApi
	 */
	public apiDamageTypesIndexGet(index: string, options?: any) {
		return GameMechanicsApiFp(this.configuration).apiDamageTypesIndexGet(index, options)(
			this.fetch,
			this.basePath
		);
	}

	public apiDamageTypesGet(options?: any) {
		return GameMechanicsApiFp(this.configuration).apiDamageTypesGet(options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 * # Magic School  Academies of magic group spells into eight categories called schools of  magic. Scholars, particularly wizards, apply these categories to all spells,  believing that all magic functions in essentially the same way, whether it  derives from rigorous study or is bestowed by a deity.
	 * @summary Get a magic school by index.
	 * @param {string} index The &#x60;index&#x60; of the magic school to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof GameMechanicsApi
	 */
	public apiMagicSchoolsIndexGet(index: string, options?: any) {
		return GameMechanicsApiFp(this.configuration).apiMagicSchoolsIndexGet(index, options)(
			this.fetch,
			this.basePath
		);
	}
}
/**
 * MonstersApi - fetch parameter creator
 * @export
 */
export const MonstersApiFetchParamCreator = function (configuration?: Configuration) {
	return {
		/**
		 *
		 * @summary Get list of monsters with optional filtering
		 * @param {Array<number>} [challengeRating] The challenge rating or ratings to filter on.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiMonstersGet(challengeRating?: Array<number>, options: any = {}): FetchArgs {
			const localVarPath = `/api/monsters`;
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			if (challengeRating) {
				localVarQueryParameter['challenge_rating'] = challengeRating;
			}

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 *
		 * @summary Get monster by index.
		 * @param {string} index The &#x60;index&#x60; of the &#x60;Monster&#x60; to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiMonstersIndexGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiMonstersIndexGet.'
				);
			}
			const localVarPath = `/api/monsters/{index}`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		}
	};
};

/**
 * MonstersApi - functional programming interface
 * @export
 */
export const MonstersApiFp = function (configuration?: Configuration) {
	return {
		/**
		 *
		 * @summary Get list of monsters with optional filtering
		 * @param {Array<number>} [challengeRating] The challenge rating or ratings to filter on.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiMonstersGet(
			challengeRating?: Array<number>,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<APIReferenceList> {
			const localVarFetchArgs = MonstersApiFetchParamCreator(configuration).apiMonstersGet(
				challengeRating,
				options
			);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 *
		 * @summary Get monster by index.
		 * @param {string} index The &#x60;index&#x60; of the &#x60;Monster&#x60; to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiMonstersIndexGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<Monster> {
			const localVarFetchArgs = MonstersApiFetchParamCreator(configuration).apiMonstersIndexGet(
				index,
				options
			);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		}
	};
};

/**
 * MonstersApi - factory interface
 * @export
 */
export const MonstersApiFactory = function (
	configuration?: Configuration,
	fetch?: FetchAPI,
	basePath?: string
) {
	return {
		/**
		 *
		 * @summary Get list of monsters with optional filtering
		 * @param {Array<number>} [challengeRating] The challenge rating or ratings to filter on.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiMonstersGet(challengeRating?: Array<number>, options?: any) {
			return MonstersApiFp(configuration).apiMonstersGet(challengeRating, options)(fetch, basePath);
		},
		/**
		 *
		 * @summary Get monster by index.
		 * @param {string} index The &#x60;index&#x60; of the &#x60;Monster&#x60; to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiMonstersIndexGet(index: string, options?: any) {
			return MonstersApiFp(configuration).apiMonstersIndexGet(index, options)(fetch, basePath);
		}
	};
};

/**
 * MonstersApi - object-oriented interface
 * @export
 * @class MonstersApi
 * @extends {BaseAPI}
 */
export class MonstersApi extends BaseAPI {
	/**
	 *
	 * @summary Get list of monsters with optional filtering
	 * @param {Array<number>} [challengeRating] The challenge rating or ratings to filter on.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof MonstersApi
	 */
	public apiMonstersGet(challengeRating?: Array<number>, options?: any) {
		return MonstersApiFp(this.configuration).apiMonstersGet(challengeRating, options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 *
	 * @summary Get monster by index.
	 * @param {string} index The &#x60;index&#x60; of the &#x60;Monster&#x60; to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof MonstersApi
	 */
	public apiMonstersIndexGet(index: string, options?: any) {
		return MonstersApiFp(this.configuration).apiMonstersIndexGet(index, options)(
			this.fetch,
			this.basePath
		);
	}
}
/**
 * RacesApi - fetch parameter creator
 * @export
 */
export const RacesApiFetchParamCreator = function (configuration?: Configuration) {
	return {
		/**
		 * Each race grants your character ability and skill bonuses as well as racial traits.
		 * @summary Get a race by index.
		 * @param {string} index The &#x60;index&#x60; of the race to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiRacesIndexGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiRacesIndexGet.'
				);
			}
			const localVarPath = `/api/races/{index}`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 *
		 * @summary Get proficiencies available for a race.
		 * @param {string} index The &#x60;index&#x60; of the race to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiRacesIndexProficienciesGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiRacesIndexProficienciesGet.'
				);
			}
			const localVarPath = `/api/races/{index}/proficiencies`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 *
		 * @summary Get subraces available for a race.
		 * @param {string} index The &#x60;index&#x60; of the race to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiRacesIndexSubracesGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiRacesIndexSubracesGet.'
				);
			}
			const localVarPath = `/api/races/{index}/subraces`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 *
		 * @summary Get traits available for a race.
		 * @param {string} index The &#x60;index&#x60; of the race to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiRacesIndexTraitsGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiRacesIndexTraitsGet.'
				);
			}
			const localVarPath = `/api/races/{index}/traits`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		}
	};
};

/**
 * RacesApi - functional programming interface
 * @export
 */
export const RacesApiFp = function (configuration?: Configuration) {
	return {
		/**
		 * Each race grants your character ability and skill bonuses as well as racial traits.
		 * @summary Get a race by index.
		 * @param {string} index The &#x60;index&#x60; of the race to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiRacesIndexGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<Race> {
			const localVarFetchArgs = RacesApiFetchParamCreator(configuration).apiRacesIndexGet(
				index,
				options
			);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 *
		 * @summary Get proficiencies available for a race.
		 * @param {string} index The &#x60;index&#x60; of the race to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiRacesIndexProficienciesGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<APIReferenceList> {
			const localVarFetchArgs = RacesApiFetchParamCreator(
				configuration
			).apiRacesIndexProficienciesGet(index, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 *
		 * @summary Get subraces available for a race.
		 * @param {string} index The &#x60;index&#x60; of the race to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiRacesIndexSubracesGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<APIReferenceList> {
			const localVarFetchArgs = RacesApiFetchParamCreator(configuration).apiRacesIndexSubracesGet(
				index,
				options
			);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 *
		 * @summary Get traits available for a race.
		 * @param {string} index The &#x60;index&#x60; of the race to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiRacesIndexTraitsGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<APIReferenceList> {
			const localVarFetchArgs = RacesApiFetchParamCreator(configuration).apiRacesIndexTraitsGet(
				index,
				options
			);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		}
	};
};

/**
 * RacesApi - factory interface
 * @export
 */
export const RacesApiFactory = function (
	configuration?: Configuration,
	fetch?: FetchAPI,
	basePath?: string
) {
	return {
		/**
		 * Each race grants your character ability and skill bonuses as well as racial traits.
		 * @summary Get a race by index.
		 * @param {string} index The &#x60;index&#x60; of the race to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiRacesIndexGet(index: string, options?: any) {
			return RacesApiFp(configuration).apiRacesIndexGet(index, options)(fetch, basePath);
		},
		/**
		 *
		 * @summary Get proficiencies available for a race.
		 * @param {string} index The &#x60;index&#x60; of the race to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiRacesIndexProficienciesGet(index: string, options?: any) {
			return RacesApiFp(configuration).apiRacesIndexProficienciesGet(index, options)(
				fetch,
				basePath
			);
		},
		/**
		 *
		 * @summary Get subraces available for a race.
		 * @param {string} index The &#x60;index&#x60; of the race to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiRacesIndexSubracesGet(index: string, options?: any) {
			return RacesApiFp(configuration).apiRacesIndexSubracesGet(index, options)(fetch, basePath);
		},
		/**
		 *
		 * @summary Get traits available for a race.
		 * @param {string} index The &#x60;index&#x60; of the race to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiRacesIndexTraitsGet(index: string, options?: any) {
			return RacesApiFp(configuration).apiRacesIndexTraitsGet(index, options)(fetch, basePath);
		}
	};
};

/**
 * RacesApi - object-oriented interface
 * @export
 * @class RacesApi
 * @extends {BaseAPI}
 */
export class RacesApi extends BaseAPI {
	/**
	 * Each race grants your character ability and skill bonuses as well as racial traits.
	 * @summary Get a race by index.
	 * @param {string} index The &#x60;index&#x60; of the race to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof RacesApi
	 */
	public apiRacesIndexGet(index: string, options?: any) {
		return RacesApiFp(this.configuration).apiRacesIndexGet(index, options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 *
	 * @summary Get proficiencies available for a race.
	 * @param {string} index The &#x60;index&#x60; of the race to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof RacesApi
	 */
	public apiRacesIndexProficienciesGet(index: string, options?: any) {
		return RacesApiFp(this.configuration).apiRacesIndexProficienciesGet(index, options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 *
	 * @summary Get subraces available for a race.
	 * @param {string} index The &#x60;index&#x60; of the race to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof RacesApi
	 */
	public apiRacesIndexSubracesGet(index: string, options?: any) {
		return RacesApiFp(this.configuration).apiRacesIndexSubracesGet(index, options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 *
	 * @summary Get traits available for a race.
	 * @param {string} index The &#x60;index&#x60; of the race to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof RacesApi
	 */
	public apiRacesIndexTraitsGet(index: string, options?: any) {
		return RacesApiFp(this.configuration).apiRacesIndexTraitsGet(index, options)(
			this.fetch,
			this.basePath
		);
	}
}
/**
 * RulesApi - fetch parameter creator
 * @export
 */
export const RulesApiFetchParamCreator = function (configuration?: Configuration) {
	return {
		/**
		 * Rule sections represent a sub-heading and text that can be found underneath a rule heading in the SRD.
		 * @summary Get a rule section by index.
		 * @param {string} index The &#x60;index&#x60; of the rule section to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiRuleSectionsIndexGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiRuleSectionsIndexGet.'
				);
			}
			const localVarPath = `/api/rule-sections/{index}`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 * # Rule   Rules are pages in the SRD that document the mechanics of Dungeons and Dragons.  Rules have descriptions which is the text directly underneath the rule heading  in the SRD. Rules also have subsections for each heading underneath the rule in the SRD.
		 * @summary Get a rule by index.
		 * @param {string} index The &#x60;index&#x60; of the rule to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiRulesIndexGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiRulesIndexGet.'
				);
			}
			const localVarPath = `/api/rules/{index}`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		}
	};
};

/**
 * RulesApi - functional programming interface
 * @export
 */
export const RulesApiFp = function (configuration?: Configuration) {
	return {
		/**
		 * Rule sections represent a sub-heading and text that can be found underneath a rule heading in the SRD.
		 * @summary Get a rule section by index.
		 * @param {string} index The &#x60;index&#x60; of the rule section to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiRuleSectionsIndexGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<RuleSection> {
			const localVarFetchArgs = RulesApiFetchParamCreator(configuration).apiRuleSectionsIndexGet(
				index,
				options
			);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 * # Rule   Rules are pages in the SRD that document the mechanics of Dungeons and Dragons.  Rules have descriptions which is the text directly underneath the rule heading  in the SRD. Rules also have subsections for each heading underneath the rule in the SRD.
		 * @summary Get a rule by index.
		 * @param {string} index The &#x60;index&#x60; of the rule to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiRulesIndexGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<Rule> {
			const localVarFetchArgs = RulesApiFetchParamCreator(configuration).apiRulesIndexGet(
				index,
				options
			);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		}
	};
};

/**
 * RulesApi - factory interface
 * @export
 */
export const RulesApiFactory = function (
	configuration?: Configuration,
	fetch?: FetchAPI,
	basePath?: string
) {
	return {
		/**
		 * Rule sections represent a sub-heading and text that can be found underneath a rule heading in the SRD.
		 * @summary Get a rule section by index.
		 * @param {string} index The &#x60;index&#x60; of the rule section to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiRuleSectionsIndexGet(index: string, options?: any) {
			return RulesApiFp(configuration).apiRuleSectionsIndexGet(index, options)(fetch, basePath);
		},
		/**
		 * # Rule   Rules are pages in the SRD that document the mechanics of Dungeons and Dragons.  Rules have descriptions which is the text directly underneath the rule heading  in the SRD. Rules also have subsections for each heading underneath the rule in the SRD.
		 * @summary Get a rule by index.
		 * @param {string} index The &#x60;index&#x60; of the rule to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiRulesIndexGet(index: string, options?: any) {
			return RulesApiFp(configuration).apiRulesIndexGet(index, options)(fetch, basePath);
		}
	};
};

/**
 * RulesApi - object-oriented interface
 * @export
 * @class RulesApi
 * @extends {BaseAPI}
 */
export class RulesApi extends BaseAPI {
	/**
	 * Rule sections represent a sub-heading and text that can be found underneath a rule heading in the SRD.
	 * @summary Get a rule section by index.
	 * @param {string} index The &#x60;index&#x60; of the rule section to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof RulesApi
	 */
	public apiRuleSectionsIndexGet(index: string, options?: any) {
		return RulesApiFp(this.configuration).apiRuleSectionsIndexGet(index, options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 * # Rule   Rules are pages in the SRD that document the mechanics of Dungeons and Dragons.  Rules have descriptions which is the text directly underneath the rule heading  in the SRD. Rules also have subsections for each heading underneath the rule in the SRD.
	 * @summary Get a rule by index.
	 * @param {string} index The &#x60;index&#x60; of the rule to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof RulesApi
	 */
	public apiRulesIndexGet(index: string, options?: any) {
		return RulesApiFp(this.configuration).apiRulesIndexGet(index, options)(
			this.fetch,
			this.basePath
		);
	}
}
/**
 * SpellsApi - fetch parameter creator
 * @export
 */
export const SpellsApiFetchParamCreator = function (configuration?: Configuration) {
	return {
		/**
		 *
		 * @summary Get list of spells with optional filtering.
		 * @param {Array<number>} [level] The level or levels to filter on.
		 * @param {Array<string>} [school] The magic school or schools to filter on.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSpellsGet(level?: Array<number>, school?: Array<string>, options: any = {}): FetchArgs {
			const localVarPath = `/api/spells`;
			const localVarUrlObj = parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			if (level) {
				localVarQueryParameter['level'] = level;
			}

			if (school) {
				localVarQueryParameter['school'] = school;
			}

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 *
		 * @summary Get a spell by index.
		 * @param {string} index The &#x60;index&#x60; of the &#x60;Spell&#x60; to get.  Available values can be found in the [&#x60;ResourceList&#x60;](#get-/api/-endpoint-) for &#x60;spells&#x60;.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSpellsIndexGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiSpellsIndexGet.'
				);
			}
			const localVarPath = `/api/spells/{index}`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		}
	};
};

/**
 * SpellsApi - functional programming interface
 * @export
 */
export const SpellsApiFp = function (configuration?: Configuration) {
	return {
		/**
		 *
		 * @summary Get list of spells with optional filtering.
		 * @param {Array<number>} [level] The level or levels to filter on.
		 * @param {Array<string>} [school] The magic school or schools to filter on.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSpellsGet(
			level?: Array<number>,
			school?: Array<string>,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<APIReferenceList> {
			const localVarFetchArgs = SpellsApiFetchParamCreator(configuration).apiSpellsGet(
				level,
				school,
				options
			);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 *
		 * @summary Get a spell by index.
		 * @param {string} index The &#x60;index&#x60; of the &#x60;Spell&#x60; to get.  Available values can be found in the [&#x60;ResourceList&#x60;](#get-/api/-endpoint-) for &#x60;spells&#x60;.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSpellsIndexGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<Spell> {
			const localVarFetchArgs = SpellsApiFetchParamCreator(configuration).apiSpellsIndexGet(
				index,
				options
			);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		}
	};
};

/**
 * SpellsApi - factory interface
 * @export
 */
export const SpellsApiFactory = function (
	configuration?: Configuration,
	fetch?: FetchAPI,
	basePath?: string
) {
	return {
		/**
		 *
		 * @summary Get list of spells with optional filtering.
		 * @param {Array<number>} [level] The level or levels to filter on.
		 * @param {Array<string>} [school] The magic school or schools to filter on.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSpellsGet(level?: Array<number>, school?: Array<string>, options?: any) {
			return SpellsApiFp(configuration).apiSpellsGet(level, school, options)(fetch, basePath);
		},
		/**
		 *
		 * @summary Get a spell by index.
		 * @param {string} index The &#x60;index&#x60; of the &#x60;Spell&#x60; to get.  Available values can be found in the [&#x60;ResourceList&#x60;](#get-/api/-endpoint-) for &#x60;spells&#x60;.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSpellsIndexGet(index: string, options?: any) {
			return SpellsApiFp(configuration).apiSpellsIndexGet(index, options)(fetch, basePath);
		}
	};
};

/**
 * SpellsApi - object-oriented interface
 * @export
 * @class SpellsApi
 * @extends {BaseAPI}
 */
export class SpellsApi extends BaseAPI {
	/**
	 *
	 * @summary Get list of spells with optional filtering.
	 * @param {Array<number>} [level] The level or levels to filter on.
	 * @param {Array<string>} [school] The magic school or schools to filter on.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof SpellsApi
	 */
	public apiSpellsGet(level?: Array<number>, school?: Array<string>, options?: any) {
		return SpellsApiFp(this.configuration).apiSpellsGet(
			level,
			school,
			options
		)(this.fetch, this.basePath);
	}

	/**
	 *
	 * @summary Get a spell by index.
	 * @param {string} index The &#x60;index&#x60; of the &#x60;Spell&#x60; to get.  Available values can be found in the [&#x60;ResourceList&#x60;](#get-/api/-endpoint-) for &#x60;spells&#x60;.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof SpellsApi
	 */
	public apiSpellsIndexGet(index: string, options?: any) {
		return SpellsApiFp(this.configuration).apiSpellsIndexGet(index, options)(
			this.fetch,
			this.basePath
		);
	}
}
/**
 * SubclassesApi - fetch parameter creator
 * @export
 */
export const SubclassesApiFetchParamCreator = function (configuration?: Configuration) {
	return {
		/**
		 *
		 * @summary Get features available for a subclass.
		 * @param {string} index The &#x60;index&#x60; of the subclass to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSubclassesIndexFeaturesGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiSubclassesIndexFeaturesGet.'
				);
			}
			const localVarPath = `/api/subclasses/{index}/features`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 * Subclasses reflect the different paths a class may take as levels are gained.
		 * @summary Get a subclass by index.
		 * @param {string} index The &#x60;index&#x60; of the subclass to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSubclassesIndexGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiSubclassesIndexGet.'
				);
			}
			const localVarPath = `/api/subclasses/{index}`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 *
		 * @summary Get all level resources for a subclass.
		 * @param {string} index The &#x60;index&#x60; of the subclass to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSubclassesIndexLevelsGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiSubclassesIndexLevelsGet.'
				);
			}
			const localVarPath = `/api/subclasses/{index}/levels`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 *
		 * @summary Get features of the requested spell level available to the class.
		 * @param {string} index The &#x60;index&#x60; of the subclass to get.
		 * @param {number} subclassLevel
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSubclassesIndexLevelsSubclassLevelFeaturesGet(
			index: string,
			subclassLevel: number,
			options: any = {}
		): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiSubclassesIndexLevelsSubclassLevelFeaturesGet.'
				);
			}
			// verify required parameter 'subclassLevel' is not null or undefined
			if (subclassLevel === null || subclassLevel === undefined) {
				throw new RequiredError(
					'subclassLevel',
					'Required parameter subclassLevel was null or undefined when calling apiSubclassesIndexLevelsSubclassLevelFeaturesGet.'
				);
			}
			const localVarPath = `/api/subclasses/{index}/levels/{subclass_level}/features`
				.replace(`{${'index'}}`, encodeURIComponent(String(index)))
				.replace(`{${'subclass_level'}}`, encodeURIComponent(String(subclassLevel)));
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 *
		 * @summary Get level resources for a subclass and level.
		 * @param {string} index The &#x60;index&#x60; of the subclass to get.
		 * @param {number} subclassLevel
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSubclassesIndexLevelsSubclassLevelGet(
			index: string,
			subclassLevel: number,
			options: any = {}
		): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiSubclassesIndexLevelsSubclassLevelGet.'
				);
			}
			// verify required parameter 'subclassLevel' is not null or undefined
			if (subclassLevel === null || subclassLevel === undefined) {
				throw new RequiredError(
					'subclassLevel',
					'Required parameter subclassLevel was null or undefined when calling apiSubclassesIndexLevelsSubclassLevelGet.'
				);
			}
			const localVarPath = `/api/subclasses/{index}/levels/{subclass_level}`
				.replace(`{${'index'}}`, encodeURIComponent(String(index)))
				.replace(`{${'subclass_level'}}`, encodeURIComponent(String(subclassLevel)));
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		}
	};
};

/**
 * SubclassesApi - functional programming interface
 * @export
 */
export const SubclassesApiFp = function (configuration?: Configuration) {
	return {
		/**
		 *
		 * @summary Get features available for a subclass.
		 * @param {string} index The &#x60;index&#x60; of the subclass to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSubclassesIndexFeaturesGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<APIReferenceList> {
			const localVarFetchArgs = SubclassesApiFetchParamCreator(
				configuration
			).apiSubclassesIndexFeaturesGet(index, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 * Subclasses reflect the different paths a class may take as levels are gained.
		 * @summary Get a subclass by index.
		 * @param {string} index The &#x60;index&#x60; of the subclass to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSubclassesIndexGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<Subclass> {
			const localVarFetchArgs = SubclassesApiFetchParamCreator(configuration).apiSubclassesIndexGet(
				index,
				options
			);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 *
		 * @summary Get all level resources for a subclass.
		 * @param {string} index The &#x60;index&#x60; of the subclass to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSubclassesIndexLevelsGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<Array<SubclassLevelResource>> {
			const localVarFetchArgs = SubclassesApiFetchParamCreator(
				configuration
			).apiSubclassesIndexLevelsGet(index, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 *
		 * @summary Get features of the requested spell level available to the class.
		 * @param {string} index The &#x60;index&#x60; of the subclass to get.
		 * @param {number} subclassLevel
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSubclassesIndexLevelsSubclassLevelFeaturesGet(
			index: string,
			subclassLevel: number,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<APIReferenceList> {
			const localVarFetchArgs = SubclassesApiFetchParamCreator(
				configuration
			).apiSubclassesIndexLevelsSubclassLevelFeaturesGet(index, subclassLevel, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 *
		 * @summary Get level resources for a subclass and level.
		 * @param {string} index The &#x60;index&#x60; of the subclass to get.
		 * @param {number} subclassLevel
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSubclassesIndexLevelsSubclassLevelGet(
			index: string,
			subclassLevel: number,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<SubclassLevel> {
			const localVarFetchArgs = SubclassesApiFetchParamCreator(
				configuration
			).apiSubclassesIndexLevelsSubclassLevelGet(index, subclassLevel, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		}
	};
};

/**
 * SubclassesApi - factory interface
 * @export
 */
export const SubclassesApiFactory = function (
	configuration?: Configuration,
	fetch?: FetchAPI,
	basePath?: string
) {
	return {
		/**
		 *
		 * @summary Get features available for a subclass.
		 * @param {string} index The &#x60;index&#x60; of the subclass to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSubclassesIndexFeaturesGet(index: string, options?: any) {
			return SubclassesApiFp(configuration).apiSubclassesIndexFeaturesGet(index, options)(
				fetch,
				basePath
			);
		},
		/**
		 * Subclasses reflect the different paths a class may take as levels are gained.
		 * @summary Get a subclass by index.
		 * @param {string} index The &#x60;index&#x60; of the subclass to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSubclassesIndexGet(index: string, options?: any) {
			return SubclassesApiFp(configuration).apiSubclassesIndexGet(index, options)(fetch, basePath);
		},
		/**
		 *
		 * @summary Get all level resources for a subclass.
		 * @param {string} index The &#x60;index&#x60; of the subclass to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSubclassesIndexLevelsGet(index: string, options?: any) {
			return SubclassesApiFp(configuration).apiSubclassesIndexLevelsGet(index, options)(
				fetch,
				basePath
			);
		},
		/**
		 *
		 * @summary Get features of the requested spell level available to the class.
		 * @param {string} index The &#x60;index&#x60; of the subclass to get.
		 * @param {number} subclassLevel
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSubclassesIndexLevelsSubclassLevelFeaturesGet(
			index: string,
			subclassLevel: number,
			options?: any
		) {
			return SubclassesApiFp(configuration).apiSubclassesIndexLevelsSubclassLevelFeaturesGet(
				index,
				subclassLevel,
				options
			)(fetch, basePath);
		},
		/**
		 *
		 * @summary Get level resources for a subclass and level.
		 * @param {string} index The &#x60;index&#x60; of the subclass to get.
		 * @param {number} subclassLevel
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSubclassesIndexLevelsSubclassLevelGet(index: string, subclassLevel: number, options?: any) {
			return SubclassesApiFp(configuration).apiSubclassesIndexLevelsSubclassLevelGet(
				index,
				subclassLevel,
				options
			)(fetch, basePath);
		}
	};
};

/**
 * SubclassesApi - object-oriented interface
 * @export
 * @class SubclassesApi
 * @extends {BaseAPI}
 */
export class SubclassesApi extends BaseAPI {
	/**
	 *
	 * @summary Get features available for a subclass.
	 * @param {string} index The &#x60;index&#x60; of the subclass to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof SubclassesApi
	 */
	public apiSubclassesIndexFeaturesGet(index: string, options?: any) {
		return SubclassesApiFp(this.configuration).apiSubclassesIndexFeaturesGet(index, options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 * Subclasses reflect the different paths a class may take as levels are gained.
	 * @summary Get a subclass by index.
	 * @param {string} index The &#x60;index&#x60; of the subclass to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof SubclassesApi
	 */
	public apiSubclassesIndexGet(index: string, options?: any) {
		return SubclassesApiFp(this.configuration).apiSubclassesIndexGet(index, options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 *
	 * @summary Get all level resources for a subclass.
	 * @param {string} index The &#x60;index&#x60; of the subclass to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof SubclassesApi
	 */
	public apiSubclassesIndexLevelsGet(index: string, options?: any) {
		return SubclassesApiFp(this.configuration).apiSubclassesIndexLevelsGet(index, options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 *
	 * @summary Get features of the requested spell level available to the class.
	 * @param {string} index The &#x60;index&#x60; of the subclass to get.
	 * @param {number} subclassLevel
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof SubclassesApi
	 */
	public apiSubclassesIndexLevelsSubclassLevelFeaturesGet(
		index: string,
		subclassLevel: number,
		options?: any
	) {
		return SubclassesApiFp(this.configuration).apiSubclassesIndexLevelsSubclassLevelFeaturesGet(
			index,
			subclassLevel,
			options
		)(this.fetch, this.basePath);
	}

	/**
	 *
	 * @summary Get level resources for a subclass and level.
	 * @param {string} index The &#x60;index&#x60; of the subclass to get.
	 * @param {number} subclassLevel
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof SubclassesApi
	 */
	public apiSubclassesIndexLevelsSubclassLevelGet(
		index: string,
		subclassLevel: number,
		options?: any
	) {
		return SubclassesApiFp(this.configuration).apiSubclassesIndexLevelsSubclassLevelGet(
			index,
			subclassLevel,
			options
		)(this.fetch, this.basePath);
	}
}
/**
 * SubracesApi - fetch parameter creator
 * @export
 */
export const SubracesApiFetchParamCreator = function (configuration?: Configuration) {
	return {
		/**
		 * Subraces reflect the different varieties of a certain parent race.
		 * @summary Get a subrace by index.
		 * @param {string} index The &#x60;index&#x60; of the subrace to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSubracesIndexGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiSubracesIndexGet.'
				);
			}
			const localVarPath = `/api/subraces/{index}`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 *
		 * @summary Get proficiences available for a subrace.
		 * @param {string} index The &#x60;index&#x60; of the subrace to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSubracesIndexProficienciesGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiSubracesIndexProficienciesGet.'
				);
			}
			const localVarPath = `/api/subraces/{index}/proficiencies`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		},
		/**
		 *
		 * @summary Get traits available for a subrace.
		 * @param {string} index The &#x60;index&#x60; of the subrace to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSubracesIndexTraitsGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiSubracesIndexTraitsGet.'
				);
			}
			const localVarPath = `/api/subraces/{index}/traits`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		}
	};
};

/**
 * SubracesApi - functional programming interface
 * @export
 */
export const SubracesApiFp = function (configuration?: Configuration) {
	return {
		/**
		 * Subraces reflect the different varieties of a certain parent race.
		 * @summary Get a subrace by index.
		 * @param {string} index The &#x60;index&#x60; of the subrace to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSubracesIndexGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<Subrace> {
			const localVarFetchArgs = SubracesApiFetchParamCreator(configuration).apiSubracesIndexGet(
				index,
				options
			);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 *
		 * @summary Get proficiences available for a subrace.
		 * @param {string} index The &#x60;index&#x60; of the subrace to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSubracesIndexProficienciesGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<APIReferenceList> {
			const localVarFetchArgs = SubracesApiFetchParamCreator(
				configuration
			).apiSubracesIndexProficienciesGet(index, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		},
		/**
		 *
		 * @summary Get traits available for a subrace.
		 * @param {string} index The &#x60;index&#x60; of the subrace to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSubracesIndexTraitsGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<APIReferenceList> {
			const localVarFetchArgs = SubracesApiFetchParamCreator(
				configuration
			).apiSubracesIndexTraitsGet(index, options);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		}
	};
};

/**
 * SubracesApi - factory interface
 * @export
 */
export const SubracesApiFactory = function (
	configuration?: Configuration,
	fetch?: FetchAPI,
	basePath?: string
) {
	return {
		/**
		 * Subraces reflect the different varieties of a certain parent race.
		 * @summary Get a subrace by index.
		 * @param {string} index The &#x60;index&#x60; of the subrace to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSubracesIndexGet(index: string, options?: any) {
			return SubracesApiFp(configuration).apiSubracesIndexGet(index, options)(fetch, basePath);
		},
		/**
		 *
		 * @summary Get proficiences available for a subrace.
		 * @param {string} index The &#x60;index&#x60; of the subrace to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSubracesIndexProficienciesGet(index: string, options?: any) {
			return SubracesApiFp(configuration).apiSubracesIndexProficienciesGet(index, options)(
				fetch,
				basePath
			);
		},
		/**
		 *
		 * @summary Get traits available for a subrace.
		 * @param {string} index The &#x60;index&#x60; of the subrace to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiSubracesIndexTraitsGet(index: string, options?: any) {
			return SubracesApiFp(configuration).apiSubracesIndexTraitsGet(index, options)(
				fetch,
				basePath
			);
		}
	};
};

/**
 * SubracesApi - object-oriented interface
 * @export
 * @class SubracesApi
 * @extends {BaseAPI}
 */
export class SubracesApi extends BaseAPI {
	/**
	 * Subraces reflect the different varieties of a certain parent race.
	 * @summary Get a subrace by index.
	 * @param {string} index The &#x60;index&#x60; of the subrace to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof SubracesApi
	 */
	public apiSubracesIndexGet(index: string, options?: any) {
		return SubracesApiFp(this.configuration).apiSubracesIndexGet(index, options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 *
	 * @summary Get proficiences available for a subrace.
	 * @param {string} index The &#x60;index&#x60; of the subrace to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof SubracesApi
	 */
	public apiSubracesIndexProficienciesGet(index: string, options?: any) {
		return SubracesApiFp(this.configuration).apiSubracesIndexProficienciesGet(index, options)(
			this.fetch,
			this.basePath
		);
	}

	/**
	 *
	 * @summary Get traits available for a subrace.
	 * @param {string} index The &#x60;index&#x60; of the subrace to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof SubracesApi
	 */
	public apiSubracesIndexTraitsGet(index: string, options?: any) {
		return SubracesApiFp(this.configuration).apiSubracesIndexTraitsGet(index, options)(
			this.fetch,
			this.basePath
		);
	}
}
/**
 * TraitsApi - fetch parameter creator
 * @export
 */
export const TraitsApiFetchParamCreator = function (configuration?: Configuration) {
	return {
		/**
		 *
		 * @summary Get a trait by index.
		 * @param {string} index The &#x60;index&#x60; of the &#x60;Trait&#x60; to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiTraitsIndexGet(index: string, options: any = {}): FetchArgs {
			// verify required parameter 'index' is not null or undefined
			if (index === null || index === undefined) {
				throw new RequiredError(
					'index',
					'Required parameter index was null or undefined when calling apiTraitsIndexGet.'
				);
			}
			const localVarPath = `/api/traits/{index}`.replace(
				`{${'index'}}`,
				encodeURIComponent(String(index))
			);
			const localVarUrlObj = url.parse(localVarPath, true);
			const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			localVarUrlObj.query = Object.assign(
				{},
				localVarUrlObj.query,
				localVarQueryParameter,
				options.query
			);
			// fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
			delete localVarUrlObj.search;
			localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

			return {
				url: url.format(localVarUrlObj),
				options: localVarRequestOptions
			};
		}
	};
};

/**
 * TraitsApi - functional programming interface
 * @export
 */
export const TraitsApiFp = function (configuration?: Configuration) {
	return {
		/**
		 *
		 * @summary Get a trait by index.
		 * @param {string} index The &#x60;index&#x60; of the &#x60;Trait&#x60; to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiTraitsIndexGet(
			index: string,
			options?: any
		): (fetch?: FetchAPI, basePath?: string) => Promise<Trait> {
			const localVarFetchArgs = TraitsApiFetchParamCreator(configuration).apiTraitsIndexGet(
				index,
				options
			);
			return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
				return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
					(response) => {
						if (response.status >= 200 && response.status < 300) {
							return response.json();
						} else {
							throw response;
						}
					}
				);
			};
		}
	};
};

/**
 * TraitsApi - factory interface
 * @export
 */
export const TraitsApiFactory = function (
	configuration?: Configuration,
	fetch?: FetchAPI,
	basePath?: string
) {
	return {
		/**
		 *
		 * @summary Get a trait by index.
		 * @param {string} index The &#x60;index&#x60; of the &#x60;Trait&#x60; to get.
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		apiTraitsIndexGet(index: string, options?: any) {
			return TraitsApiFp(configuration).apiTraitsIndexGet(index, options)(fetch, basePath);
		}
	};
};

/**
 * TraitsApi - object-oriented interface
 * @export
 * @class TraitsApi
 * @extends {BaseAPI}
 */
export class TraitsApi extends BaseAPI {
	/**
	 *
	 * @summary Get a trait by index.
	 * @param {string} index The &#x60;index&#x60; of the &#x60;Trait&#x60; to get.
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof TraitsApi
	 */
	public apiTraitsIndexGet(index: string, options?: any) {
		return TraitsApiFp(this.configuration).apiTraitsIndexGet(index, options)(
			this.fetch,
			this.basePath
		);
	}
}
