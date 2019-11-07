window.CBOT = null;
const botAreaId = 'BOT_AREA';
const showStyle =
  'position:fixed;transition:all .5s ease;opacity:1;visibility:visible;z-index:100;width:100%;height:100%;right:0;bottom:0';
const hideStyle =
  'position:fixed;transition:all .5s ease;opacity:0;width:24px;height:24px;z-index:-1;visibility:hidden;right:30px;bottom:30px;';

let __instance = null;
export default class CandidateBot {
  constructor(options = {}) {
    if (__instance) {
      return __instance;
    }
    __instance = this;
    this._options = options
    this.init(options);
  }

  init = options => {
    //创建聊天区域
    // createBotArea();
    
    //创建图标
    if (options.show_trigger) {
      this.createBotIcon(options);
    }else {
      this.createIframe()
    }
  };

  show = () => {
    let botDom = document.getElementById(botAreaId);
    botDom.setAttribute('style', showStyle);
  };

  hide = () => {
    let botDom = document.getElementById(botAreaId);
    botDom.setAttribute('style', hideStyle);
  };

  createIframe = () => {
    let domFrame = document.createElement("iframe");
    domFrame.setAttribute('id', botAreaId);
    domFrame.style="border: none;"
    ///index.html?bot_type=${this._options.bot_type}&url=${this._options.url}&position_id=${this.position_id}
    //http://192.168.6.216:3333
    domFrame.src = `${this._options.host}/?show_trigger=${this._options.show_trigger}&bot_type=${this._options.bot_type}&url=${this._options.url}&position_id=${this._options.position_id}`
    document.body.appendChild(domFrame);
    this.show()
  }

  createBotIcon = (options) => {
    let domHead = document.querySelector('head');
    let domStyle = document.createElement('style');
    domStyle.innerHTML = `
      #BOT_TRIGGER{
        background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTQgKDc2NDgwKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4NCiAgICA8dGl0bGU+Ym90X2ltZzwvdGl0bGU+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGRlZnM+DQogICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iMTAwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIiBpZD0ibGluZWFyR3JhZGllbnQtMSI+DQogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMjI5M0ZGIiBvZmZzZXQ9IjAlIj48L3N0b3A+DQogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMEY1QUZGIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4NCiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4NCiAgICA8L2RlZnM+DQogICAgPGcgaWQ9IumhtemdojEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8ZyBpZD0iMi3mgqzmta5fSG92ZXLlpI3liLYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMTQ4LjAwMDAwMCwgLTM2Ni4wMDAwMDApIj4NCiAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtMuWkjeWItiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTEzMi4wMDAwMDAsIDI4Mi4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICA8ZyBpZD0iYm90X2ltZyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYuMDAwMDAwLCA4NC4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICAgICAgPGc+DQogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTIsMjQgQzUuMzcyNTgzLDI0IDAsMTguNjI3NDE3IDAsMTIgQzAsNS4zNzI1ODMgNS4zNzI1ODMsMy41NTI3MTM2OGUtMTUgMTIsMy41NTI3MTM2OGUtMTUgTDIwLjcyNzI3MjcsMy41NTI3MTM2OGUtMTUgQzIyLjUzNDc1MDEsMy41NTI3MTM2OGUtMTUgMjQsMS40NjUyNDk5MSAyNCwzLjI3MjcyNzI3IEwyNCwxMiBDMjQsMTguNjI3NDE3IDE4LjYyNzQxNywyNCAxMiwyNCBaIiBpZD0i6Lev5b6EIiBmaWxsPSJ1cmwoI2xpbmVhckdyYWRpZW50LTEpIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLjAwMDAwMCwgMTIuMDAwMDAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC0xMi4wMDAwMDAsIC0xMi4wMDAwMDApICI+PC9wYXRoPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTcuNjM2MzYzNjQsNy42MzYzNjM2NCBMMTYuMzYzNjM2NCw3LjYzNjM2MzY0IEMxOC43NzM2MDYyLDcuNjM2MzYzNjQgMjAuNzI3MjcyNyw5LjU5MDAzMDE4IDIwLjcyNzI3MjcsMTIgQzIwLjcyNzI3MjcsMTQuNDA5OTY5OCAxOC43NzM2MDYyLDE2LjM2MzYzNjQgMTYuMzYzNjM2NCwxNi4zNjM2MzY0IEw3LjYzNjM2MzY0LDE2LjM2MzYzNjQgQzUuMjI2MzkzODIsMTYuMzYzNjM2NCAzLjI3MjcyNzI3LDE0LjQwOTk2OTggMy4yNzI3MjcyNywxMiBDMy4yNzI3MjcyNyw5LjU5MDAzMDE4IDUuMjI2MzkzODIsNy42MzYzNjM2NCA3LjYzNjM2MzY0LDcuNjM2MzYzNjQgWiIgaWQ9IuefqeW9oiIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+DQogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNy45NjM2MzYzNiwxMC4wMzYzNjM2IEM4LjQ0NTYzMDMzLDEwLjAzNjM2MzYgOC44MzYzNjM2NCwxMC40MjcwOTY5IDguODM2MzYzNjQsMTAuOTA5MDkwOSBMOC44MzYzNjM2NCwxMy4wOTA5MDkxIEM4LjgzNjM2MzY0LDEzLjU3MjkwMzEgOC40NDU2MzAzMywxMy45NjM2MzY0IDcuOTYzNjM2MzYsMTMuOTYzNjM2NCBDNy40ODE2NDI0LDEzLjk2MzYzNjQgNy4wOTA5MDkwOSwxMy41NzI5MDMxIDcuMDkwOTA5MDksMTMuMDkwOTA5MSBMNy4wOTA5MDkwOSwxMC45MDkwOTA5IEM3LjA5MDkwOTA5LDEwLjQyNzA5NjkgNy40ODE2NDI0LDEwLjAzNjM2MzYgNy45NjM2MzYzNiwxMC4wMzYzNjM2IFoiIGlkPSLnn6nlvaIiIGZpbGw9IiMzMjdERkYiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE2LjAzNjM2MzYsMTAuMDM2MzYzNiBDMTYuNTE4MzU3NiwxMC4wMzYzNjM2IDE2LjkwOTA5MDksMTAuNDI3MDk2OSAxNi45MDkwOTA5LDEwLjkwOTA5MDkgTDE2LjkwOTA5MDksMTMuMDkwOTA5MSBDMTYuOTA5MDkwOSwxMy41NzI5MDMxIDE2LjUxODM1NzYsMTMuOTYzNjM2NCAxNi4wMzYzNjM2LDEzLjk2MzYzNjQgQzE1LjU1NDM2OTcsMTMuOTYzNjM2NCAxNS4xNjM2MzY0LDEzLjU3MjkwMzEgMTUuMTYzNjM2NCwxMy4wOTA5MDkxIEwxNS4xNjM2MzY0LDEwLjkwOTA5MDkgQzE1LjE2MzYzNjQsMTAuNDI3MDk2OSAxNS41NTQzNjk3LDEwLjAzNjM2MzYgMTYuMDM2MzYzNiwxMC4wMzYzNjM2IFoiIGlkPSLnn6nlvaIiIGZpbGw9IiMzMjdERkYiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPg0KICAgICAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgPC9nPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+") no-repeat 50% 50%;
        background-size: 30px 30px;
        animation: BOT_TRIGGER_SHAKE 1s ease-in-out infinite;
        width: 56px;
        height: 56px;
        position: fixed;
        right: 20px;
        bottom: 30px;
        cursor: pointer;
      }
      #BOT_TRIGGER.bot_mobile {
        background-color: #fff;
        border-radius: 50%;
        border: 0.1px solid #d5e1ff;
        box-shadow: 0 10px 20px rgba(28, 92, 207, 0.1);
      }
      @keyframes EBOT-TRIGGER {
        0% {
          opacity: 0;
          border-radius: 50%;
          transform: translateY(-94%) scale(0.4 / 0.9);
        }
        8.3% {
          opacity: 0.5;
          border-radius: 42% 50% 50%;
          transform: translateY(6%) scale(0.43 / 0.9);
        }
        16.7% {
          opacity: 1;
          border-radius: 17% 50% 50%;
          transform: translateY(32%) scale(0.5 / 0.9);
        }
        33.3% {
          border-radius: 17% 50% 50%;
          transform: translateY(26%) scale(0.6 / 0.9);
        }
        50% {
          border-radius: 12% 50% 50%;
          transform: translateY(4%) scale(0.93 / 0.9);
        }
        66.7% {
          transform: translateY(-2%) scale(0.91 / 0.9);
        }
        100% {
          opacity: 1;
          border-radius: 12% 50% 50%;
          transform: translateY(0%) scale(0.9 / 0.9);
        }
      }
      @keyframes BOT_TRIGGER_SHAKE {
      13% {transform: translateY(1%)}
      19% {transform: translateY(2%)}
      38% {transform: translateY(7%)}
      50% {transform: translateY(8%)}
      69% {transform: translateY(5%)}
      88% {transform: translateY(0)}
      }
    `;
    domHead.appendChild(domStyle)
    let dv = document.createElement('div');
    dv.setAttribute('id', 'BOT_TRIGGER');
    dv.onclick = () => {
      this.createIframe()
    };
    if (options.triggerStyle) {
      dv.setAttribute('style', options.triggerStyle);
    }
    dv.setAttribute('class', 'bot_mobile');

    // if (isMobile) {
    //   dv.setAttribute('class', 'bot_mobile');
    // } else {
    //   dv.setAttribute('class', 'bot_pc');
    // }
    document.body.appendChild(dv);
  }

}