using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace zeld.io.NetCode.ServerCode
{
    /// <summary>
    /// This is just a relaying server.  Players send their game state here and the server
    /// just forwards it to the other players.
    /// </summary>
    public class ZeldioServerHub : Hub
    {
        public override Task OnConnected()
        {
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            return base.OnDisconnected(stopCalled);
        }

        public void SendState(object playerState)
        {
            // pass the player state on to the other connected clients.
            Clients.Others.RecieveState(playerState);
        }
    }
}