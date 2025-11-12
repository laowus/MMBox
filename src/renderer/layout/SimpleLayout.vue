<script setup></script>

<template>
  <div>simple-layout</div>
</template>

<style scoped>
.simple-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  -webkit-app-region: none;
  --cover-size: 500px;
  --scrollbar-height: 3px;
  --bottom-height: 88px;
}

.simple-layout .spacing {
  margin-left: 15px;
}

.simple-layout .v-spacing {
  margin-top: 15px;
}

.simple-layout svg {
  fill: var(--svg-color);
  cursor: pointer;
}

.simple-layout svg:hover,
.simple-layout .active svg {
  fill: var(--svg-hover-color);
  cursor: pointer;
}

.simple-layout > .center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  position: relative;
  height: var(--cover-size);
}

.simple-layout > .center .top {
  -webkit-app-region: drag;
  width: 100%;
  height: 56px;
  z-index: 2;
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.simple-layout > .center .top svg {
  -webkit-app-region: none;
}

.simple-layout > .center .top:hover {
  background: var(--app-bg);
  opacity: 0.85;
}

.simple-layout > .center .top .left {
  display: flex;
  height: 100%;
  width: 188px;
  position: relative;
}

.simple-layout > .center .top .left .win-ctl-wrap {
  display: flex;
  align-items: center;
  padding-left: 15px;
  overflow: hidden;
}

.simple-layout > .center .top .left .extra {
  height: 100%;
  position: absolute;
  right: 0px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
}

.simple-layout > .center .top .left .extra .platform {
  display: flex;
  align-items: center;
}

.simple-layout > .center .top .left .extra .platform span {
  color: var(--hl-color);
  border-radius: 3px;
  border: 1.3px solid var(--hl-color);
  padding: 1px 3px;
  font-size: 10px;
  font-weight: 600;
  margin-right: 8px;
}

.simple-layout > .center .top .left .extra .cate-name {
  padding: 1px;
  font-weight: bold;
  /* font-size: var(--text-sub-size); */
  background: var(--hl-text-bg);
  -webkit-background-clip: text;
  color: transparent;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  width: 75px;
}

.simple-layout > .center .top .flex-space {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.simple-layout .listen-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}

.simple-layout .listen-btn .text {
  padding: 3px 6px;
  -webkit-app-region: none;
}

.simple-layout .listen-btn .play-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.simple-layout .listen-btn .play-btn:hover svg,
.simple-layout .listen-btn .play-btn:hover .text {
  color: var(--hl-color);
  fill: var(--svg-hover-color);
}

.simple-layout > .center .top .action {
  visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 130px;
  padding-right: 15px;
  margin-left: 43px;
}

.simple-layout > .center .top .action .lyric-btn {
  width: 15px;
  height: 13px;
  border-radius: 3px;
  display: inline-block;
  cursor: pointer;
  border: 2px solid var(--svg-color);
  text-align: center;
  vertical-align: middle;
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 3px;
}

.simple-layout > .center .top .action .lyric-show {
  border: 2px solid var(--svg-hover-color);
  color: var(--hl-color);
}

.simple-layout > .center .top .action .text-color-btn {
  background: #000;
  background: var(--svg-color);
  width: 15px;
  height: 11px;
  border-radius: 3px;
  display: inline-block;
  cursor: pointer;
  border: 2px solid var(--svg-color);
  text-align: center;
  vertical-align: middle;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  padding-bottom: 2px;
  margin-bottom: 3px;
}

.simple-layout > .center .top .action .text-color-black {
  background: #fff;
  color: #000;
}

.simple-layout > .center .top .left,
.simple-layout > .center .top .flex-space,
.simple-layout > .center .top .action {
  visibility: hidden;
}

.simple-layout > .center .top-fixed .action {
  -webkit-app-region: none;
}

.simple-layout > .center .top-fixed .left,
.simple-layout > .center .top-fixed .flex-space,
.simple-layout > .center .top-fixed .action,
.simple-layout > .center .top:hover .left,
.simple-layout > .center .top:hover .flex-space,
.simple-layout > .center .top:hover .action {
  visibility: visible;
}

.simple-layout > .center .meta-wrap {
  width: 100%;
  z-index: 2;
  position: absolute;
  bottom: 10px;
  left: 0px;
  text-align: left;
  padding: 33px;
}

.simple-layout > .center .meta-wrap .audio-title {
  font-size: 28px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  width: 86.8%;
  line-height: 36px;
}

.simple-layout > .center .meta-wrap .audio-artist {
  font-size: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  width: 80%;
  line-height: 32px;
}

.simple-layout > .center .cover,
.simple-layout > .center .cover img {
  width: var(--cover-size);
  height: var(--cover-size);
  z-index: 1;
}

.simple-layout > .center .audio-time-wrap {
  width: 100%;
  z-index: 2;
  position: absolute;
  bottom: 20px;
  left: 0px;
  text-align: left;
  font-size: 13px;
  display: flex;
}

.simple-layout .audio-time-wrap .t-current {
  position: absolute;
  left: 10px;
}

.simple-layout .audio-time-wrap .t-duration {
  position: absolute;
  right: 10px;
}

.simple-layout .canvas-wrap {
  width: 100%;
  z-index: 1;
  position: absolute;
  bottom: 0px;
  left: 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.simple-layout .canvas-wrap canvas {
  flex: 1;
  overflow: hidden;
}

.simple-layout > .bottom {
  width: 100%;
  height: var(--bottom-height);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.simple-layout .progress-wrap {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

.simple-layout .progress-wrap .progress-bar {
  flex: 1;
  height: var(--scrollbar-height);
}

.simple-layout > .bottom .action {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.simple-layout > .bottom .action .btm-left,
.simple-layout > .bottom .action .btm-right {
  width: 135px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.simple-layout > .bottom .action .btm-left {
  justify-content: flex-start;
}

.simple-layout > .bottom .action .btm-right {
  justify-content: flex-end;
}

.simple-layout > .bottom .action .btm-center {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.simple-layout > .bottom .volume-bar {
  width: 25px;
}

.simple-layout > .bottom .volume-bar:hover {
  width: 80px;
}

.simple-layout > .bottom .action .love-btn {
  fill: var(--svg-hover-color) !important;
}

.simple-layout > .bottom .lyric-ctl {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 90%;
}

.simple-layout > .bottom .lyric-ctl .line {
  font-size: 18px;
  line-height: 30px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-align: center;
  width: 100%;
}

.simple-layout > .bottom .lyric-ctl .current {
  background: var(--hl-text-bg);
  -webkit-background-clip: text;
  color: transparent;
  font-size: 21px;
  font-weight: bold;
}

.simple-layout > .bottom .lyric-ctl .v-spacing {
  margin-top: 0px;
}

/* */
.simple-layout .win-traffic-light-btn {
  width: 56px !important;
}

.simple-layout .win-traffic-light-btn .ctl-btn {
  width: 13px;
  height: 13px;
  margin-right: 8px;
}

.simple-layout .win-ctl-wrap .collapse-btn svg {
  width: 18px !important;
  height: 18px !important;
}

/* Popovers */
.simple-layout #playback-queue-view {
  width: 335px;
}

.simple-layout #audio-effect-view {
  width: 404px;
  height: 366px;
}

.simple-layout #audio-effect-view .left {
  width: 68px;
}

.simple-layout #audio-effect-view .center .content {
  height: 295px;
  padding-top: 5px;
  overflow-y: scroll;
}

.simple-layout #audio-effect-view .center .bands {
  display: none;
}

.simple-layout #video-playing-view .win-ctl-wrap {
  width: 105px !important;
}

.simple-layout #video-playing-view .win-traffic-light-btn .max-btn {
  display: none;
}
</style>
