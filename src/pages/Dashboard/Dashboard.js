import { useState, useEffect, Fragment } from "react";
import ActivityHeader from "../../components/ActivityHeader/ActivityHeader";
import activityEmptyStateImage from "./activity-empty-state.png";
import CardGroup from "../../components/CardGroup/CardGroup";
import ModalConfirm from "../../components/ModalConfirm/ModalConfirm";

import classes from "./Dashboard.module.css";
import CToast from "../../components/CToast/CToast";
import { Spinner } from "react-bootstrap";

const DashboardEmpty = () => {
  const [activityGroup, setActivityGroup] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("Activity berhasil dihapus");
  const [groupData, setGroupData] = useState({});
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (refresh) {
      fetch(
        "https://todo.api.devcode.gethired.id/activity-groups?email=yoga%2B1%40skyshi.io"
      )
        .then((res) => res.json())
        .then((data) => {
          setRefresh(false);
          setActivityGroup(data.data ? data.data : []);
        })
        .catch((err) => {
          setRefresh(false);
          setToastText(err.message);
          setShowToast(true);
          console.log(err.message);
        });
    }
  }, [refresh]);

  const addActivityGroupHandler = () => {
    setIsLoading(true);
    fetch("https://todo.api.devcode.gethired.id/activity-groups", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "New Activity",
        email: "yoga+1@skyshi.io",
        _comment:
          "email digunakan untuk membedakan list data yang digunakan antar aplikasi",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setActivityGroup((prevState) => {
          return [
            {
              id: data.id,
              title: data.title,
              created_at: data.created_at,
            },
            ...prevState,
          ];
        });

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setToastText(err.message);
        setShowToast(true);
        console.log(err.message);
      });
  };

  const deleteActivityGroupHandler = (id) => {
    fetch("https://todo.api.devcode.gethired.id/activity-groups/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 1) {
          setRefresh(true);
        }
      })
      .catch((err) => {
        setGroupData({});
        console.log(err.message);
      });
      setShowModal(false);
      setToastText("Activity berhasil dihapus");
      setShowToast(true);
      setGroupData({});
  };

  return (
    <div className={"container " + classes["container-group"]}>
      {refresh ? (
        <div className={classes["spinner-background"]}>
          <Spinner
            as="span"
            animation="border"
            role="status"
            aria-hidden="true"
          />
        </div>
      ) : (
        <Fragment>
          <ModalConfirm
            show={showModal}
            setShowModal={setShowModal}
            actionHandler={deleteActivityGroupHandler}
            groupData={groupData}
            kind="activity"
          />

          <ActivityHeader
            addHandler={addActivityGroupHandler}
            isLoading={isLoading}
            dataCyTitle="activity-title"
            dataCyOvalButton="activity-add-button"
          />
          <div className="row">
            {activityGroup.length ? (
              activityGroup.map((val, idx, arr) => {
                return (
                  <div key={val.id} className="col-sm-3">
                    <CardGroup
                      data={val}
                      setShowModal={setShowModal}
                      setGroupData={setGroupData}
                    />
                  </div>
                );
              })
            ) : (
              <div data-cy="activity-empty-state" className="text-center">
                <img
                  className={classes["activity-empty-state"]}
                  src={activityEmptyStateImage}
                  alt="activityEmptyStateImage"
                  onClick={addActivityGroupHandler}
                />
              </div>
            )}
          </div>

          <CToast
            showToast={showToast}
            setShowToast={setShowToast}
            text={toastText}
          />
        </Fragment>
      )}
    </div>
  );
};

export default DashboardEmpty;
