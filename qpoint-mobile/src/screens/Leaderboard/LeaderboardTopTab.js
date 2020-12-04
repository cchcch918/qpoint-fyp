import React, { memo } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ClassLeaderboard from './ClassLeaderboard'
import GroupLeaderboard from './GroupLeaderboard'
import OverallLeaderboard from './OverallLeadoard'

const LeaderboardTap = createMaterialTopTabNavigator();

const LeaderboardTopTap = ({route}) => {
    const {classId} = route.params
    const {studentId} = route.params
    // console.log(classId)
    // console.log(studentId)
    return(
        <LeaderboardTap.Navigator>
            <LeaderboardTap.Screen 
                name="Class Leaderboard" 
                children={()=><ClassLeaderboard classId={classId} studentId={studentId}/>}
                options={() => ({
                    title: 'Class',
                  })} 
            />

            <LeaderboardTap.Screen 
                name="Group Leaderboard" 
                children={()=><GroupLeaderboard studentId={studentId}/>}
                options={() => ({
                    title: 'Groups',
                  })} 
            />

            <LeaderboardTap.Screen 
                name="Overall Leaderboard" 
                children={()=><OverallLeaderboard studentId={studentId}/>}
                options={() => ({
                    title: 'School',
                  })} 
            />

        </LeaderboardTap.Navigator>
    )
}

export default LeaderboardTopTap