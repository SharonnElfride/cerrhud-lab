import { displayUserName } from "@/helpers/user_by_id_helper";
import type { Tables } from "@/lib/supabase/supabase";
import { toCustomDetailObject } from "@/models/CustomDetail";
import { ImagePlaceholder } from "@/shared/constants";
import { MedicalTestsData, SharedEntityData } from "@/shared/entity-data";
import { MedicalTestFormFieldsInfo } from "@/shared/form-fields-info";
import { cFormatDate } from "@/utils/formatting";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  CEntityDetailItem,
  CEntityDetailItemTitle,
  CEntityDetailItemValue,
} from "../ui/custom/entity-details-page/centity-detail-item";
import { Item, ItemContent, ItemTitle } from "../ui/item";
import { Separator } from "../ui/separator";
import CustomDetailsOverview from "./CustomDetailsOverview";

interface MedicalTestOverviewProps {
  medicalTest: Tables<"medical_tests">;
}

const MedicalTestOverview = ({ medicalTest }: MedicalTestOverviewProps) => {
  const customDetails = toCustomDetailObject(medicalTest.custom_details);

  return (
    <div className="space-y-5">
      <div className="grid gap-2 lg:grid-cols-3">
        <Card className="lg:col-span-2 gap-2">
          <CardHeader>
            <CardTitle>{MedicalTestsData.view.overviewCardTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <img
                src={medicalTest.image ?? ImagePlaceholder(medicalTest.title)}
                loading="lazy"
                alt={medicalTest.title}
                className="w-full h-full rounded-lg"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <CEntityDetailItem displaySeparator={false}>
                <CEntityDetailItemTitle typo={"medium"}>
                  {MedicalTestFormFieldsInfo.price.label}
                </CEntityDetailItemTitle>
                <CEntityDetailItemValue typo={"muted"}>
                  {medicalTest.price > 0 ? (
                    `${medicalTest.price} FCFA`
                  ) : (
                    <Badge>Cet examen médical est gratuit</Badge>
                  )}
                </CEntityDetailItemValue>
              </CEntityDetailItem>

              <CEntityDetailItem displaySeparator={false}>
                <CEntityDetailItemTitle typo={"medium"}>
                  {MedicalTestFormFieldsInfo.acronym.label}
                </CEntityDetailItemTitle>
                <CEntityDetailItemValue typo={"muted"}>
                  {medicalTest.acronym ?? "--"}
                </CEntityDetailItemValue>
              </CEntityDetailItem>

              <CEntityDetailItem displaySeparator={false}>
                <CEntityDetailItemTitle typo={"medium"}>
                  {MedicalTestFormFieldsInfo.mobile_id.label}
                </CEntityDetailItemTitle>
                <CEntityDetailItemValue typo={"muted"}>
                  {medicalTest.mobile_id}
                </CEntityDetailItemValue>
              </CEntityDetailItem>
            </div>

            <Separator />

            <CEntityDetailItem displaySeparator={false}>
              <CEntityDetailItemTitle typo={"medium"} padding={"average"}>
                {MedicalTestFormFieldsInfo.description.label}
              </CEntityDetailItemTitle>
              <CEntityDetailItemValue
                typo={"muted"}
                className="text-sm text-justify"
              >
                {medicalTest.description}
              </CEntityDetailItemValue>
            </CEntityDetailItem>

            <CEntityDetailItem displaySeparator={false}>
              <CEntityDetailItemTitle typo={"medium"} padding={"average"}>
                {MedicalTestFormFieldsInfo.sample_instructions.label}
              </CEntityDetailItemTitle>

              <ul className="space-y-1 list-disc list-inside">
                {medicalTest.sample_instructions?.map((si) => (
                  <li
                    key={si.toKeyCase()}
                    className="text-sm text-muted-foreground"
                  >
                    {si}
                  </li>
                ))}
              </ul>
            </CEntityDetailItem>

            <Separator />

            <CEntityDetailItem displaySeparator={false}>
              <CEntityDetailItemTitle typo={"medium"} padding={"average"}>
                {MedicalTestFormFieldsInfo.custom_details.label}
              </CEntityDetailItemTitle>

              <CustomDetailsOverview customDetails={customDetails} />
            </CEntityDetailItem>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Card className="gap-2">
            <CardHeader>
              <CardTitle className="text-base">
                {SharedEntityData.metadata}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <CEntityDetailItem>
                <CEntityDetailItemTitle>
                  {SharedEntityData.createdAt}
                </CEntityDetailItemTitle>
                <CEntityDetailItemValue>
                  {cFormatDate(medicalTest.created_at!)}
                </CEntityDetailItemValue>
              </CEntityDetailItem>

              <CEntityDetailItem>
                <CEntityDetailItemTitle>
                  {SharedEntityData.createdBy}
                </CEntityDetailItemTitle>
                <CEntityDetailItemValue>
                  {displayUserName(medicalTest.created_by!)}
                </CEntityDetailItemValue>
              </CEntityDetailItem>

              <CEntityDetailItem>
                <CEntityDetailItemTitle>
                  {SharedEntityData.updatedAt}
                </CEntityDetailItemTitle>
                <CEntityDetailItemValue>
                  {cFormatDate(medicalTest.updated_at!)}
                </CEntityDetailItemValue>
              </CEntityDetailItem>

              <CEntityDetailItem>
                <CEntityDetailItemTitle>
                  {SharedEntityData.updatedBy}
                </CEntityDetailItemTitle>
                <CEntityDetailItemValue>
                  {displayUserName(medicalTest.updated_by!)}
                </CEntityDetailItemValue>
              </CEntityDetailItem>

              <CEntityDetailItem displaySeparator={false}>
                <CEntityDetailItemTitle>
                  {SharedEntityData.id}
                </CEntityDetailItemTitle>
                <CEntityDetailItemValue typo={"mono"}>
                  {medicalTest.id}
                </CEntityDetailItemValue>
              </CEntityDetailItem>
            </CardContent>
          </Card>

          <Card className="gap-2">
            <CardHeader>
              <CardTitle className="text-base">
                {MedicalTestFormFieldsInfo.conditions.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {medicalTest.conditions.map((condition) => (
                  <Item
                    key={condition.toKeyCase()}
                    variant={"secondary"}
                    size="2xs"
                    className="w-full"
                  >
                    <ItemContent>
                      <ItemTitle className="text-xs">{condition}</ItemTitle>
                    </ItemContent>
                  </Item>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="gap-5">
            <CardHeader>
              <CardTitle className="text-base">
                {MedicalTestFormFieldsInfo.keywords.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {medicalTest.keywords?.map((kw) => (
                  <Badge key={kw} variant="secondary" className="capitalize">
                    {kw}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MedicalTestOverview;
