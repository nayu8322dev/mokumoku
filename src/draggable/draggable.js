"use strict";

class Draggable {
    constructor(option) {
        this.option = Object.assign({ targetClassName: ".drag-and-drop", handlarClassName: ".drag-and-drop-handlar" }, option);

        const inisializeElement = () => {
            const elements = document.querySelectorAll(this.option.targetClassName);

            elements.forEach((element) => {
                const handlars = element.querySelectorAll(this.option.handlarClassName);
                let handlar = element;
                if (handlars && handlars.length > 0) {
                    handlar = handlars[0];
                }
                handlar.addEventListener("mousedown", (e) => { mdown(e, element) }, false);
                handlar.addEventListener("touchstart", (e) => { mdown(e, element) }, false);
            });
        }
        document.addEventListener('DOMContentLoaded', inisializeElement);

        // ドラッグ開始時の初期値
        let _x;
        let _y;

        let _dragElement;
        let _dragElementHeight;
        let _dragElementWidth;
        let _windowHeight;
        let _windowWidth;

        const mdown = (e, dragElement) => {
            // 開始時の要素の状態を保持
            _dragElement = dragElement;
            _dragElement.classList.add("drag");

            _dragElementHeight = _dragElement.clientHeight;
            _dragElementWidth = _dragElement.clientWidth;
            _windowHeight = window.innerHeight;
            _windowWidth = window.innerWidth;

            //イベントの差異を吸収
            let event;
            if (e.type === "mousedown") {
                event = e;
            } else {
                event = e.changedTouches[0];
            }

            //要素内の相対座標を取得
            _x = event.pageX - _dragElement.offsetLeft;
            _y = event.pageY - _dragElement.offsetTop;

            // 移動イベント
            document.addEventListener("mousemove", mmove, false);
            document.addEventListener("touchmove", mmove, false);
            // 停止イベント
            document.addEventListener("mouseup", mup, false);
            document.addEventListener("touchend", mup, false);
        }

        const mmove = (e) => {
            if (!_dragElement) {
                return;
            }

            //イベントの差異を吸収
            let event;
            if (e.type === "mousemove") {
                event = e;
            } else {
                event = e.changedTouches[0];
            }

            //フリックのデフォルト動作を抑制
            e.preventDefault();

            //画面の外にはみださない範囲で移動量分だけ要素を動かす
            _dragElement.style.top = Math.min(Math.max((event.pageY - _y), 0), (_windowHeight - _dragElementHeight)) + "px";
            _dragElement.style.left = Math.min(Math.max((event.pageX - _x), 0), (_windowWidth - _dragElementWidth)) + "px";
        }

        const mup = (e) => {
            if (!_dragElement) {
                return;
            }

            //移動イベント・終了イベントのハンドラ削除
            document.removeEventListener("mousemove", mmove, false);
            document.removeEventListener("mouseup", mup, false);
            document.removeEventListener("touchmove", mmove, false);
            document.removeEventListener("touchend", mup, false);

            // ドラッグ用のclass削除
            _dragElement.classList.remove("drag");
            _dragElement = null;
        }
    }

}