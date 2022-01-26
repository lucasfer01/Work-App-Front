import React from 'react';

export function Workerpost({ workerposts }) {
    return <div>
        {workerposts.length ?
            workerposts.map(workerpost => <div key={workerpost.wp_id}>
                <img src={workerpost.wp_photo && workerpost.wp_photo[0]} width='500px' alt="foto workerpost" />
                <h1>{workerpost.wp_title}</h1>
                <h2>{workerpost.wp_description}</h2>
            </div>) : 'No existen workerposts'}
    </div>;
}