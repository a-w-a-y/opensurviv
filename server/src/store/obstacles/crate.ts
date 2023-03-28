import { world } from "../..";
import { RectHitbox, Vec2 } from "../../types/math";
import { Obstacle } from "../../types/obstacle";
import { LOOT_TABLES } from "../../types/loot_table";

export default class Crate extends Obstacle {
	static readonly LOOT_TABLE = "crate";
	type = "crate";

	constructor() {
		const hitbox = new RectHitbox(4, 4);
		super(world, hitbox, hitbox.scaleAll(0.75), 80, 80);
		this.direction = Vec2.UNIT_X;
		while (world.terrainAtPos(this.position).id != "plain" || world.obstacles.find(obstacle => obstacle.collided(this))) this.position = world.size.scale(Math.random(), Math.random());
	}

	die() {
		super.die();
		// this code doesn't work, so using audio-play and audio-loader. 
		// Both are depreceated but who's going to update this anyways... 
		//it's only going to play music that's not even 5 seconds long!
		// const soundPlayer = require("sound-play");
		// soundPlayer.play("./sounds/crate.mp3", 1);
		const play = require('audio-play');
		const load = require('audio-loader');
		load('./src/assets/sounds/crate.mp3').then(play);
		const entities = LOOT_TABLES.get(Crate.LOOT_TABLE)?.roll();
		if (entities) {
			world.entities.push(...entities.map(e => {
				e.position = this.position;
				return e;
			}));
		}
	}
}