import { ReactElement } from "react";

import { OrganizationList } from "@clerk/nextjs";

function CreateOrganizationPage(): ReactElement {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl="/organization/:id"
      afterCreateOrganizationUrl="/organization/:id"
    />
  );
}

export default CreateOrganizationPage;
