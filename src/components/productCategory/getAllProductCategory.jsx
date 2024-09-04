import { Link } from "react-router-dom";

import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../UI/Card";
import { loadAllProductCategory } from "../../redux/rtk/features/productCategory/productCategorySlice";
import ViewBtn from "../Buttons/ViewBtn";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddProductCategory from "./addProductCategory";

const GetAllProductCategory = (props) => {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector(
    (state) => state.productCategories
  );
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });
  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/admin/product-category/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, { id }) => (
        <Link to={`/admin/product-category/${id}`}>{name}</Link>
      ),
      renderCsv: (name) => name,
    },
    {
      id: 3,
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("YYYY-MM-DD"),
      renderCsv: (createdAt) => moment(createdAt).format("YYYY-MM-DD"),
    },
    {
      id: 4,
      title: "Action",
      key: "Action",
      render: ({ id }) => <ViewBtn path={`/admin/product-category/${id}`} />,
      csvOff: true,
    },
  ];
  const filters = [
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Show", value: "true" },
        { label: "Hide", value: "false" },
      ],
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
  ];
  useEffect(() => {
    dispatch(loadAllProductCategory(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0 "
      headClass="border-none"
      title={"Product Category"}
      extra={
        <div className="flex justify-between md:justify-start gap-3 items-center">
          <CreateDrawer
            permission={"create-productCategory"}
            title={"Create Category"}
            width={35}
          >
            <AddProductCategory />
          </CreateDrawer>
        </div>
      }
    >
      <UserPrivateComponent permission={"readAll-productCategory"}>
        <TableComponent
          list={list}
          total={total}
          loading={loading}
          columns={columns}
          filters={filters}
          title={"Product Category List"}
          setPageConfig={setPageConfig}
          isSearch
        />
      </UserPrivateComponent>
    </Card>
  );
};

export default GetAllProductCategory;
