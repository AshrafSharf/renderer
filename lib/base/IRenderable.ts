import {IAsset} from "@awayjs/core";

import {IMaterial} from "./IMaterial";
import {IElements} from "./IElements";
import {Style} from "./Style";
import { PickingCollision } from '../pick/PickingCollision';

/**
 * IRenderable provides an interface for objects that can use materials.
 *
 * @interface away.base.IRenderable
 */
export interface IRenderable extends IAsset
{
	style:Style;
}