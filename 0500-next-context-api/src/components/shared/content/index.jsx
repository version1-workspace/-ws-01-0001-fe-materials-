"use client";
import styles from "./index.module.css";
import Header from "@/components/shared/header";
import Sidebar from "@/components/shared/sidebar";
import { ModalContainer } from "@/lib/modal";
import { ToastContainer } from "@/lib/toast";
import { TaskListContainer } from "@/contexts/tasks";
import { position } from "@/lib/toast/config";
import { Inter } from "next/font/google";
import { ProjectsContainer } from "@/contexts/projects";
import { NotificaitonBarContainer } from "@/contexts/notificationBar";

const inter = Inter({ subsets: ["latin"] });

export default function Body({ children }) {
  return (
    <body className={[inter.className, styles.body].join(" ")}>
      <ProjectsContainer>
        <TaskListContainer>
          <ToastContainer
            config={{
              position: position.TOP_RIGHT,
            }}
          >
            <ModalContainer config={{ width: "60%" }}>
              <NotificaitonBarContainer>
                <Header />
                <main className={styles.main}>
                  <Sidebar />
                  <div className={styles.mainContent}>{children}</div>
                </main>
              </NotificaitonBarContainer>
            </ModalContainer>
          </ToastContainer>
        </TaskListContainer>
      </ProjectsContainer>
    </body>
  );
}

export const dynamic = "error";