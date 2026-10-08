"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useBreadcrumbs } from "@/utils/useBreadcrumbs";
import { HiOutlineHome } from "react-icons/hi2";

export function BreadcrumbComponent() {
  const [segments, length] = useBreadcrumbs();

  if (!length || !segments) return null;

  return (
    <Breadcrumb className="p-3">
      <BreadcrumbList>
        {length > 0 && (
          <BreadcrumbLink
            render={
              <Link href="/">
                <span title="Home">
                  <HiOutlineHome className="size-4 text-white" />
                </span>
              </Link>
            }
          />
        )}

        {segments.map((segment, i) => (
          <React.Fragment key={i}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {/* disable last element in breadcrumbs as link */}
              {length !== ++i ? (
                <BreadcrumbLink
                  render={<Link href={`/${segment}`}>{segment}</Link>}
                />
              ) : (
                segment
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
