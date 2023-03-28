import { world } from "../..";
import { Entity } from "../../types/entity";
import { CircleHitbox } from "../../types/math";
import { Obstacle } from "../../types/obstacle";
import { randomBetween } from "../../utils";

export default class Stone extends Obstacle {
	type = "stone";

	constructor() {
		const salt = randomBetween(0.9, 1.1);
		super(world, new CircleHitbox(2).scaleAll(salt), new CircleHitbox(1.5).scaleAll(salt), 250, 250);
		while (world.terrainAtPos(this.position).id != "plain" || world.obstacles.find(obstacle => obstacle.collided(this))) this.position = world.size.scale(Math.random(), Math.random());
	}
	// tick(_entities: Entity[], _obstacles: Obstacle[]): void {
	// 	// just for sounds!
	// 	const play = require('audio-play');
	// 	const load = require('audio-loader');
	// 	load('./src/assets/obj_break_sounds/stone.mp3').then(play);
	// }
}