import { world } from "../..";
import { Entity } from "../../types/entity";
import { CircleHitbox } from "../../types/math";
import { Obstacle } from "../../types/obstacle";

export default class Bush extends Obstacle {
	type = "bush";
	noCollision = true;

	constructor() {
		const hitbox = new CircleHitbox(2);
		super(world, hitbox, hitbox, 100, 100);
		while (world.terrainAtPos(this.position).id != "plain" || world.obstacles.find(obstacle => obstacle.collided(this))) this.position = world.size.scale(Math.random(), Math.random());
	}
	die() {
		super.die();
		const play = require('audio-play');
		const load = require('audio-loader');
		load('./src/assets/sounds/bush.mp3').then(play);
	}
}