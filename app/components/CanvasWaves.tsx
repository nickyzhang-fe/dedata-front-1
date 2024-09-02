/*
 * @Date: 2024-08-23 23:00:39
 * @LastEditors: nickyzhang
 * @LastEditTime: 2024-08-24 23:29:21
 * @FilePath: /dedata-front/app/components/CanvasWaves.tsx
 * @Description:
 */
export class CanvasWaves {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private waveCount = 3; // 波浪的条数
	private waveLength = 150; // 波长
	private centerY = 0; // 中心线
	private maxAmplitude = 100; // 最大振幅
	private frequency = 0.1; // 波动速度
	private phase = 0; // 相位
	private animationId: any; // 动画 ID，用于控制动画的启动和暂停

	constructor(
		canvas: HTMLCanvasElement,
		waveCount: number = 3,
		waveLength: number = 100,
		maxAmplitude: number = 120,
		frequency: number = 0.1
	) {
		if (!canvas) {
			throw new Error('CanvasWaves: canvas is null');
		}
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d')!;
		this.waveCount = waveCount;
		this.waveLength = waveLength;
		this.maxAmplitude = maxAmplitude;
		this.frequency = frequency;
		this.centerY = this.canvas.height / 2;
		this.reset();
	}

	init() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.beginPath();
		this.ctx.moveTo(0, this.centerY);
		this.ctx.lineTo(this.canvas.width, this.centerY);
		this.ctx.strokeStyle = `#3a54df`;
		this.ctx.fillStyle = '#fff';
		this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		this.ctx.lineWidth = 1;
	}

	render() {
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.beginPath();

		for (let i = 0; i < this.waveCount; i++) {
			this.ctx.beginPath();
			for (let x = 0; x <= this.canvas.width; x++) {
				// 确保振幅在中间最大，两端为零
				const amplitude =
					(this.maxAmplitude / 2) * Math.sin((Math.PI * x) / this.canvas.width) * ((i + 1) / this.waveCount);
				const y = this.centerY + amplitude * Math.sin(x / this.waveLength - this.phase);
				this.ctx.lineTo(x, y);
			}
			this.ctx.strokeStyle = `rgba(58, 84, 223, 0.4)`;
			this.ctx.lineWidth = 1;
			this.ctx.stroke();

			// 画出对称的下半部分
			this.ctx.beginPath();
			for (let x = 0; x <= this.canvas.width; x++) {
				const amplitude =
					(this.maxAmplitude / 2) * Math.sin((Math.PI * x) / this.canvas.width) * ((i + 1) / this.waveCount);
				const y = this.centerY - amplitude * Math.sin(x / this.waveLength - this.phase); // 对称轴上下对称
				this.ctx.lineTo(x, y);
			}
			this.ctx.strokeStyle = `rgba(58, 84, 223, 0.7)`;
			this.ctx.stroke();

			this.ctx.beginPath();
			for (let x = 0; x <= this.canvas.width; x++) {
				const amplitude = this.maxAmplitude * 0.7 * Math.sin((Math.PI * x) / this.canvas.width);
				const y = this.centerY + amplitude * Math.sin(x / this.waveLength - this.phase); // 对称轴上下对称
				this.ctx.lineTo(x, y);
			}
			this.ctx.strokeStyle = `rgba(58, 84, 223, 1)`;
			this.ctx.stroke();
		}

		this.phase += this.frequency; // 更新相位，使波浪向左移动
		this.animationId = requestAnimationFrame(this.render.bind(this));
	}

	play() {
		if (!this.animationId) {
			this.render();
		}
	}

	pause() {
		if (this.animationId) {
			cancelAnimationFrame(this.animationId);
			this.animationId = null;
		}
	}

	reset() {
		this.phase = 0; // 重置相位
		cancelAnimationFrame(this.animationId);
		this.animationId = null;
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // 清除画布
		this.ctx.beginPath();
		this.ctx.moveTo(0, this.centerY);
		this.ctx.lineTo(this.canvas.width, this.centerY);
		this.ctx.strokeStyle = `#3a54df`;
		this.ctx.fillStyle = '#fff';
		this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		this.ctx.lineWidth = 1;
		this.ctx.stroke();
	}
}
