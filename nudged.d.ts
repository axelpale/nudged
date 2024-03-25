// Type definitions for nudged version 2.0.0
// Project: nudged

declare module "nudged" {
  export function estimate(params: EstimatorParams): Transform;
  export namespace estimators {
    export function I(): Transform;
    export function L(
      domain: Point[],
      range: Point[],
      angle: number
    ): Transform;
    export function X(domain: Point[], range: Point[]): Transform;
    export function Y(domain: Point[], range: Point[]): Transform;
    export function T(domain: Point[], range: Point[]): Transform;
    export function S(
      domain: Point[],
      range: Point[],
      center: Point
    ): Transform;
    export function R(
      domain: Point[],
      range: Point[],
      center: Point
    ): Transform;
    export function TS(domain: Point[], range: Point[]): Transform;
    export function TR(domain: Point[], range: Point[]): Transform;
    export function SR(
      domain: Point[],
      range: Point[],
      center: Point
    ): Transform;
    export function TSR(domain: Point[], range: Point[]): Transform;
  }
  export namespace point {
    export function almostEqual(
      p: Point,
      q: Point,
      tolerance?: number
    ): boolean;
    export function create(x: number, y: number): Point;
    export function distance(p: Point, q: Point): number;
    export function equal(p: Point, q: Point): boolean;
    export function fromArray(arrp: [number, number]): Point;
    export function offset(p: Point, dx: number, dy: number): Point;
    export function polarOffset(
      p: Point,
      distance: number,
      angle: number
    ): Point;
    export function toArray(p: Point): [number, number];
    export function transform(p: Point, tr: Transform): Point;
    export function transformMany(points: Point[], tr: Transform): Point[];
    export function validate(p: any): boolean;
  }
  export namespace transform {
    export const SINGULAR: Transform;
    export const IDENTITY: Transform;
    export const ROT45: Transform;
    export const ROT90: Transform;
    export const ROT180: Transform;
    export const ROT270: Transform;
    export const HALF: Transform;
    export const X2: Transform;
    export function almostEqual(
      tr: Transform,
      ts: Transform,
      tolerance?: number
    ): boolean;
    export function compose(tr: Transform, ts: Transform): Transform;
    export function create(
      a: number,
      b: number,
      x: number,
      y: number
    ): Transform;
    export function equal(tr: Transform, ts: Transform): boolean;
    export function fromArray(
      arrtr: [number, number, number, number]
    ): Transform;
    export function fromPolar(
      center: Point,
      scale: number,
      rotation: number
    ): Transform;
    export function fromRotation(center: Point, radians: number): Transform;
    export function fromScale(center: Point, multiplier: number): Transform;
    export function fromString(str: string): Transform;
    export function fromTranslation(p: Point): Transform;
    export function getRotation(tr: Transform): number;
    export function getScale(tr: Transform): number;
    export function getTranslation(tr: Transform): Point;
    export { compose as multiply };
    export function inverse(tr: Transform): Transform;
    export function rotateBy(
      tr: Transform,
      center: Point,
      radians: number
    ): Transform;
    export function rotateTo(
      tr: Transform,
      center: Point,
      radians: number
    ): Transform;
    export function scaleBy(
      tr: Transform,
      center: Point,
      multiplier: number
    ): Transform;
    export function scaleTo(
      tr: Transform,
      center: Point,
      scale: number
    ): Transform;
    export function toArray(tr: Transform): [number, number, number, number];
    export function toMatrix(tr: Transform): Matrix;
    export function toString(tr: Transform): string;
    export function translateBy(tr: Transform, vec: Vector): Transform;
    export function translateTo(tr: Transform, point: Point): Transform;
    export function validate(tr: any): boolean;
  }
  namespace analysis {
    export function mse(tr: Transform, domain: Point[], range: Point[]): number;
    export function residuals(
      tr: Transform,
      domain: Point[],
      range: Point[]
    ): number[];
    export function rss(tr: Transform, domain: Point[], range: Point[]): number;
  }
  export const tolerance: number;
  export const version: string;

  export interface EstimatorParams {
    estimator: string;
    domain: Point[];
    range: Point[];
    center?: Point;
    angle?: number;
  }

  export interface Transform {
    a: number;
    b: number;
    x: number;
    y: number;
  }

  export interface Point {
    x: number;
    y: number;
  }

  export interface Matrix {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
  }

  export interface Vector {
    x: number;
    y: number;
  }
}
