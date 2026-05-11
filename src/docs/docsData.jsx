
import Installation from "./GettingStarted/Installation";
import Help from "./GettingStarted/Help";

import CreatePools from "./Pools/createPools";
import Seasons from "./Pools/seasons";

import CreateRate from "./Rate/CreateRate";

export const docsCategories = {
    "Getting Started": {
        Installation: <Installation />,
        Help: <Help />,
    },
    Pools: {
        "Create Pools": <CreatePools />,
        Seasons: <Seasons />,
    },
    Rate: {
        "Create Rate": <CreateRate />,
    }
};
