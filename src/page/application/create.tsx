import { Button, Flex, Form, GetProp, Upload, UploadFile, UploadProps, Image, Space, Card, Tabs, message } from "antd";
import React, { useEffect, useState } from "react";
import { getBase64 } from "../../utils"
import { ApplicationForm } from "./form/appDetailForm";
import { CAForm } from "./form/CAForm";
import { AddressForm } from "./form/addressForm";
import dayjs from "dayjs";
import { useCreateApplicationMutation, useFetchApplicationsQuery, useUploadFileMutation } from "../../reduxtoolkit/applicationApi";
import { useAuth0 } from "@auth0/auth0-react";
import { nanoid } from "nanoid";
import { useLocation, useNavigate } from "react-router-dom";
import { ApplicationDataType } from ".";
import { RcFile } from "antd/es/upload/interface";
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export interface CustomUploadFile extends UploadFile {
  selected: boolean;
}
const AppCreate: React.FC = () => {
  const { user } = useAuth0();
  const [messageApi, contextHolder] = message.useMessage();
  const [submitStatus, setSubmitStatus] = useState<"Draft" | "Waiting">("Draft");
  const [cteateApplication, { data: successData, isSuccess: createSuccess, isLoading: isCreateLoading }] = useCreateApplicationMutation({});
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [formDisable, setFormDisable] = useState<boolean>(false);
  const [formInitData, setFormInitData] = useState<ApplicationDataType>();

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const applicationNo = searchParams.get("applicationNo");
  const { data: applicationData, isSuccess } = useFetchApplicationsQuery({
    applicationNo
  }, {
    skip: !applicationNo,
    refetchOnMountOrArgChange:true
  });
  const [uploadFile, { isSuccess: isUploadFileSuccess }] = useUploadFileMutation();

  useEffect(() => {
    if (isSuccess && applicationData?.content?.length && applicationNo) {
      console.log("applicationData?.content[0]", applicationData?.content[0])
      let formInitData = applicationData?.content[0];
      form.setFieldsValue({
        ...formInitData,
        ...formInitData?.address,
        expireDate: dayjs(formInitData.expireDate),
        birthDate: dayjs(formInitData.birthDate),
        applicationDate: dayjs(formInitData.applicationDate)
      });
      if (formInitData.status === 'Approved') {
        setFormDisable(true);
      }
      formInitData?.attachments.forEach(async (file: any) => {
        const response = await fetch(`http://localhost:8080/api/files/uploads/${file.fileName}`);
        if (!response.ok) {
          console.error('File not found');
          return;
        }
        // Convert to Blob and then to File object
        const blob = await response.blob();
        const blobFile = new File([blob], file.fileName, { type: blob.type }) as RcFile;
        let files: UploadFile = {
          uid: file.attachmentId,
          name: file.fileName,
          status: "done",
          url: `http://localhost:8080/api/files/uploads/${file.fileName}`,
          preview: `http://localhost:8080/api/files/uploads/${file.fileName}`,
          originFileObj: blobFile
        }
        setFileList(prev => ([...prev, files]));
      });

      setFormInitData(formInitData);
    }
  }, [applicationData, isSuccess, applicationNo])

  const handleBeforeUpload = (file: RcFile) => {
    getBase64(file).then((preview) => {
      const uploadFile: UploadFile = {
        uid: file.uid,
        name: file.name,
        status: 'done',
        preview,
        originFileObj: file,
      };

      setFileList(prev => [...prev, uploadFile]);
    });

    return false; // Prevent automatic upload
  };

  const handleRemoveAll = () => {
    setFileList([]);
    setSelectedFiles([])
  };

  const handleRemoveSelectedFiles = () => {
    const newFileLists = fileList.filter(f => !selectedFiles.includes(f.uid));
    setFileList(newFileLists);
  }

  const [form] = Form.useForm();
  const onFinish = (values: any, submitStatus: 'Draft' | 'Waiting') => {
    console.log("Form values:", values);
    const applicationNo = `APP_NO-${nanoid(12)}`
    let formData = {
      ...values,
      expireDate: dayjs(values?.expireDate),
      birthDate: dayjs(values?.birthDate),
      applicationNo: values?.applicationNo ? values.applicationNo : applicationNo,
      applicationDate: dayjs(),
      createdBy: user?.name,
      updatedBy: user?.name,
      status: submitStatus,
      applicationId: formInitData?.applicationId
    }
    cteateApplication(formData);
  };

  const toggleSelect = (uid: string, selected: boolean) => {
    if (selected) {
      const files = selectedFiles.filter(f => f !== uid);
      setSelectedFiles(files)
    }
    else {
      setSelectedFiles(prev => [...prev, uid]);
    }
  };
  useEffect(() => {
    if (createSuccess) {
      console.log("fileList", fileList.length)
      fileList.forEach(fileWrapper => {
        const rawFile = fileWrapper.originFileObj; // Get the actual File object
        console.log("rawFile", fileWrapper)
        if (rawFile) {
          const formData = new FormData();
          formData.append("file", rawFile);
          formData.append("applicationId", successData?.applicationId);
          uploadFile(formData);
          console.log(successData)
        }
      });
      messageApi.open({
        type: 'success',
        content: 'Application data are successfully saved',
      });
      // navigate("/credit-analyst")
    }
  }, [createSuccess, successData]);
  return (
    <>
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => onFinish(values, submitStatus)}
        style={{ maxWidth: 1000, margin: "0 auto" }}
      >
        <Tabs
          // onChange={onChange}
          type="card"
          items={[
            {
              label: "Application",
              key: "Application",
              children: <> <ApplicationForm />
                <CAForm />
                <Card style={{ marginTop: 20, minHeight: 50 }} title="Attachments">
                  <Flex wrap="wrap" gap={20} style={{ marginBottom: 20 }}>
                    {fileList.map((file) => (
                      <div
                        key={file.uid}
                        onClick={() => toggleSelect(file.uid, selectedFiles.includes(file.uid))}
                        style={{
                          border: selectedFiles.includes(file.uid) ? "2px solid #1890ff" : "1px solid #ccc",
                          borderRadius: 8,
                          padding: 20,
                          cursor: "pointer",
                          transition: "border 0.2s",
                        }}
                      >
                        <Image
                          key={file.uid}
                          width={100}
                          height={100}
                          src={file.preview}
                          style={{ objectFit: "cover", borderRadius: 8 }}
                          alt={file.fileName}
                        />
                      </div>
                    ))}
                  </Flex>
                  <Form.Item name="upload" valuePropName="fileList" getValueFromEvent={() => fileList}>
                    <Space size='large'>
                      <Upload
                        beforeUpload={handleBeforeUpload}
                        fileList={[]}
                        showUploadList={false}
                      >
                        <Button type="primary">
                          Add files
                        </Button>
                      </Upload>
                      <Button
                        onClick={handleRemoveSelectedFiles}
                        disabled={!selectedFiles.length}
                        danger
                      >
                        Remove
                      </Button>
                      <Button
                        onClick={handleRemoveAll}
                        type="primary"
                        danger
                        disabled={!fileList.length}
                      >
                        Remove All
                      </Button>
                    </Space>
                  </Form.Item>
                </Card>
              </>
            },
            {
              label: "Address",
              key: "address",
              children: <AddressForm />
            }
          ]}
        />
        <Card style={{ marginTop: 20, padding: 0 }} styles={{
          body: {
            paddingBottom: 0
          }
        }}>
          <Form.Item>
            <Button
              loading={isCreateLoading}
              disabled={formDisable}
              style={{ marginRight: 20 }}
              type="primary"
              htmlType="submit"
              onClick={() => setSubmitStatus("Draft")}
            >
              Save
            </Button>
            <Button
              loading={isCreateLoading}
              disabled={formDisable}
              type="primary"
              htmlType="submit"
              onClick={() => setSubmitStatus("Waiting")}
            >
              Submit
            </Button>
          </Form.Item>
        </Card>
      </Form>
    </>
  );
};
export default AppCreate;


