import { world } from "../..";
import { RectHitbox, Vec2 } from "../../types/math";
import { Obstacle } from "../../types/obstacle";
import { LOOT_TABLES } from "../../types/loot_table";

export default class AWMCrate extends Obstacle {
	static readonly LOOT_TABLE = "crate_rare";
	type = "AWMCrate";

	constructor() {
		const hitbox = new RectHitbox(4, 5);
		super(world, hitbox, hitbox.scaleAll(0.75), 200, 200);
		this.direction = Vec2.UNIT_X;
		while (world.terrainAtPos(this.position).id != "plain" || world.obstacles.find(obstacle => obstacle.collided(this))) this.position = world.size.scale(Math.random(), Math.random());
	}

	die() {
		super.die();
		const play = require('audio-play');
		const load = require('audio-loader');
		load('./src/assets/sounds/crate.mp3').then(play);
		const entities = LOOT_TABLES.get(AWMCrate.LOOT_TABLE)?.roll();
		if (entities) {
			world.entities.push(...entities.map(e => {
				e.position = this.position;
				return e;
			}));
		}
	}
}