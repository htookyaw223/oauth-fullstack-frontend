import { Button, Input, InputRef, message, Space, Table, TableColumnType, TablePaginationConfig, Tag, Typography } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFetchApplicationsQuery, useUpdateApplicationStatusMutation } from "../../reduxtoolkit/applicationApi"
import { SearchOutlined } from "@ant-design/icons";
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
const defaultFilterData = {
    page: 0,
    size: 20,
    firstname: "",
    lastname: ""
};
export interface ApplicationDataType {
    key: string;
    applicationId: string;
    applicationNo: string;
    applicationDate: string; // or Date, if you parse it
    applicationType: string | null;
    idNo: string;
    expireDate: string; // or Date
    idType: string;
    firstnameEn: string;
    lastnameEn: string;
    firstnameTh: string;
    lastnameTh: string;
    birthDate: string; // or Date
    gender: string;
    locationType: string;
    mobileNumber: string;
    optional: string;
    positionType: string;
    jobType: string;
    workMonth: number;
    workYear: number;
    incomeMonth: number;
    incomeYear: number;
    residence: string;
    childenNumber: number | null;
    maritalType: string;
    status: string;
    createBy: string | null;
    createDate: string; // or Date
    updateBy: string | null;
    updateDate: string | null; // or Date | null
}
type DataIndex = keyof ApplicationDataType;
const ApplicationListPage = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [defaultFilter, setDefaultFilter] = useState(defaultFilterData);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 20,
        total: 0,
    });
    const { data, isLoading, isFetching, isSuccess } = useFetchApplicationsQuery({
        ...defaultFilter
    }, {
        refetchOnMountOrArgChange: true
    });
    const [updateApplicationStatus, { isSuccess: isStatusUpdateSuccess, data: statusData }] = useUpdateApplicationStatusMutation();
    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
        setDefaultFilter(defaultFilter)
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<ApplicationDataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [

        {
            title: "Application Number",
            dataIndex: "applicationNo",
            key: "applicationNo",
            render: (text: string) => <Typography.Text>{text}</Typography.Text>,
            ...getColumnSearchProps('applicationNo'),
        },
        {

            title: "Application Date",
            dataIndex: "applicationDate",
            key: "applicationDate",
            render: (text: string) => <Typography.Text>{text}</Typography.Text>,
            sorter: true
        },
        {
            title: "Identification Number",
            dataIndex: "idNo",
            key: "idNo",
            render: (text: string) => <Typography.Text>{text}</Typography.Text>,
            sorter: true,
            ...getColumnSearchProps('idNo'),
        },
        {
            title: "First Name (English)",
            dataIndex: "firstnameEn",
            key: "firstnameEn",
            render: (text: string) => <Typography.Text>{text}</Typography.Text>,
            sorter: true
        },

        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text: string) => {
                let color: string = text === 'Waiting' ? 'orange' :
                    text === 'Approved' ? 'green' : 'red';
                let text1: string = text === 'Waiting' ? 'Wait for Approve' : text;
                return (<Tag color={color}>{text1}</Tag>)
            },
            filters: [
                { text: 'Draft', value: 'Draft' },
                { text: 'Wait for Approve', value: 'Waiting' },
                { text: 'Approved', value: 'Approved' },
                { text: 'Rejected', value: 'Rejected' },
            ]
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "status",
            render: (text: any, record: ApplicationDataType) => {
                return (
                    <Space>
                        <Button onClick={() =>  window.location.href = "/application?applicationNo=" + record.applicationNo}>
                            View
                        </Button>
                        {
                            record.status === 'Waiting' &&
                            <>
                                <Button
                                    onClick={() => updateApplicationStatus({
                                        applicationId: record.applicationId,
                                        status: "Approved"
                                    })}
                                >
                                    Approve
                                </Button>
                                <Button
                                    onClick={() => updateApplicationStatus({
                                        applicationId: record.applicationId,
                                        status: "Rejected"
                                    })}
                                >
                                    Reject
                                </Button>
                            </>
                        }

                    </Space>
                )
            }
        },
    ]
    const handleTableChange = (pagination: any, filters: any, sorter: any) => {

        console.log(pagination, filters, sorter)

        setPagination({
            ...pagination,
            current: pagination.current!,
            pageSize: pagination.pageSize!,
        });
        let sort = sorter ? [sorter.field] : [];
        let direction = sorter ? sorter.order === 'ascend' ? ['asc'] : ['desc'] : [];
        setDefaultFilter((prev) => ({
            ...prev,
            page: pagination.current! - 1,
            size: pagination.pageSize!,
            direction: direction,
            sort: sort,
            ...filters
        }));

    };
    useEffect(() => {
        if (isSuccess && data) {
            setPagination({
                ...pagination,
                total: data.totalElements,
            });
        }
    }, [isSuccess, data]);
    useEffect(() => {
        if (isStatusUpdateSuccess && statusData) {
            messageApi.info(`Application ${statusData.status} successful`)
        }
    }, [isStatusUpdateSuccess, statusData])

    const { dataSource } = useMemo(() => {
        if (!isSuccess) {
            return {
                dataSource: []
            }
        }
        return {
            dataSource: data?.content as ApplicationDataType[]
        }
    }, [data, isSuccess]);

    return (
        <>
            {contextHolder}
            <Input.Search
                placeholder="Search by name..."
                onSearch={(val) => setDefaultFilter((prevState) => ({ ...prevState, firstname: val }))}
                style={{ width: 300, marginBottom: 20 }}
                allowClear
            />
            <div>
                <Table
                    pagination={{
                        ...pagination,
                        pageSizeOptions: [20, 50, 100],
                        showSizeChanger: true
                    }}
                    loading={isLoading || isFetching}
                    dataSource={dataSource}
                    columns={columns}
                    onChange={(pagination, filters, sorter) => handleTableChange(pagination, filters, sorter)}
                />
            </div>
        </>
    );
}
export default ApplicationListPage;

