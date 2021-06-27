import "./styles.scss";
import CardAppointment from "../cardAppointment";
import CardMember from "../cardMember";
import CardPresenceList from "../cardPresenceList";
import {fetchCustomerAction} from '../../store/action';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'

const MainBoard = ({
  isAppointment,
  listHeader,
  isMemberPage,
  isPresenceListPage,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch()
  const customers = useSelector(state=>state.customerReducer.fetchCustomer.customers)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(()=>{
    dispatch(fetchCustomerAction())
  },[]);

  // useEffect(()=>{
  //   fetch(`https://localhost:3000/customers`)
  //        .then(response => response.json())
  //        .then(data => console.log(data.results))
  //        .catch(err => {
  //            console.log(err)
  //        })
  // })

  return (
    <>
    {/* <h1>{JSON.stringify(customers[0].name)} asldksadfsda</h1> */}
    <div className="main-board">
      <div className="header__main-board">
        {listHeader.map((text) => {
          return (
            <div className={`${text === "Id" && "id-text"} text-header `}>
              {text}
            </div>
          );
        })}
      </div>
      {isLoading && (
        <SkeletonTheme color="white" highlightColor="#efefef">
          <p>
            <Skeleton circle={true} count={9} />
          </p>
        </SkeletonTheme>
      )}

      {!isLoading &&
        customers.map((customer) => {
          return isMemberPage ? (
            <CardMember customer={customer} />
          ) : isPresenceListPage ? (
            <CardPresenceList customer={customer} />
          ) : (
            <CardAppointment customer={customer} isAppointment={isAppointment} />
          );
        })}
    </div>
    </>
  );
};

export default MainBoard;
