
import Installation from "./GettingStarted/Installation";
import Help from "./GettingStarted/Help";

import CreatePools from "./Pools/createPools";
import Seasons from "./Pools/seasons";


export const docsCategories = {
    "Getting Started": {
        Installation: <Installation />,
        Help: <Help />,
    },
    Pools: {
        "Create Pools": <CreatePools />,
        Seasons: <Seasons />,
    },
};
