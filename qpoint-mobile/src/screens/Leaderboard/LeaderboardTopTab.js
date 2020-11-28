import React, { memo } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ClassLeaderboard from './ClassLeaderboard'
import GroupLeaderboard from './GroupLeaderboard'
import OverallLeaderboard from './OverallLeadoard'

const LeaderboardTap = createMaterialTopTabNavigator();

const LeaderboardTopTap = ({route}) => {
    const {classId} = route.params
    // console.log(classId)
    return(
        <LeaderboardTap.Navigator>
            <LeaderboardTap.Screen 
                name="Class Leaderboard" 
                children={()=><ClassLeaderboard classId={classId}/>}
                options={() => ({
                    title: 'Class Leaderboard',
                  })} 
            />

            <LeaderboardTap.Screen 
                name="Group Leaderboard" 
                component={GroupLeaderboard} 
            />

            <LeaderboardTap.Screen 
                name="Overall Leaderboard" 
                component={OverallLeaderboard} 
            />

        </LeaderboardTap.Navigator>
    )
}

export default LeaderboardTopTap