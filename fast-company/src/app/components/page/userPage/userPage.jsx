import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { useHistory } from "react-router-dom";
import CommentList from "../../ui/commentList";
import CreateComment from "../../ui/createComment";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    const [allUsers, setAllUsers] = useState();
    const [comments, setComments] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setAllUsers(data));
        api.users.getById(userId).then((data) => setUser(data));
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);

    const handleClick = () => {
        history.push(`/users/${user._id}/edit`);
    };

    const handleDelete = (id) => {
        api.comments.remove(id);
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    };

    const commentSubmit = () => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    };

    if (user && comments && allUsers) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card mb-3">
                            <div className="card-body">
                                <button
                                    className="
                                    position-absolute
                                    top-0
                                    end-0
                                    btn btn-light btn-sm
                                "
                                    onClick={handleClick}
                                >
                                    <i className="bi bi-gear"></i>
                                </button>
                                <div
                                    className="
                                    d-flex
                                    flex-column
                                    align-items-center
                                    text-center
                                    position-relative
                                "
                                >
                                    <img
                                        src={`https://avatars.dicebear.com/api/avataaars/${(
                                            Math.random() + 1
                                        )
                                            .toString(36)
                                            .substring(7)}.svg`}
                                        className="rounded-circle shadow-1-strong me-3"
                                        alt="avatar"
                                        width="150"
                                        height="150"
                                    />
                                    <div className="mt-3">
                                        <h4>{user.name}</h4>
                                        <p className="text-secondary mb-1">
                                            {user.profession.name}
                                        </p>
                                        <div className="text-muted">
                                            <i
                                                className="
                                                bi bi-caret-down-fill
                                                text-primary
                                            "
                                                role="button"
                                            ></i>
                                            <i
                                                className="
                                                bi bi-caret-up
                                                text-secondary
                                            "
                                                role="button"
                                            ></i>
                                            <span className="ms-2">
                                                {user.rate}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-3">
                            <div
                                className="
                                card-body
                                d-flex
                                flex-column
                                justify-content-center
                                text-center
                            "
                            >
                                <h5 className="card-title">
                                    <span>Qualities</span>
                                </h5>
                                <p className="card-text">
                                    {user.qualities.map((q) => (
                                        <span
                                            key={q._id}
                                            className={`badge bg-${q.color} me-2`}
                                        >
                                            {q.name}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card mb-3">
                                <div
                                    className="
                                    card-body
                                    d-flex
                                    flex-column
                                    justify-content-center
                                    text-center
                                "
                                >
                                    <h5 className="card-title">
                                        <span>Completed meetings</span>
                                    </h5>

                                    <h1 className="display-1">
                                        {user.completedMeetings}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <CreateComment
                            allUsers={allUsers}
                            pageId={userId}
                            commentSubmit={commentSubmit}
                        />
                        <CommentList
                            comments={comments}
                            allUsers={allUsers}
                            onHandleDelete={handleDelete}
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

export default UserPage;
