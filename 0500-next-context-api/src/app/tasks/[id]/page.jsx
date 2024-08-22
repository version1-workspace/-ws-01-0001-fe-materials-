"use client";
import route from "@/lib/route";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useForm } from "@/hooks/useForm";
import api from "@/services/api";
import DateInput from "@/components/shared/input/date";
import AppDate from "@/lib/date";
import {
  selectableStatus,
  statusOptions,
} from "@/services/api/models/task";
import Select from "@/components/shared/select";
import TextArea from "@/components/shared/input/textarea";
import { join } from "@/lib/cls";
import Button from "@/components/shared/button";
import { useToast } from "@/lib/toast/hook";
import ErrorMessage from "@/components/shared/errorMessage";
import useProjects from "@/contexts/projects";
import { factory } from "@/services/api/models";
import Icon from "@/components/shared/icon";
import EditableField from "@/components/shared/editableField";

const TaskDetail = ({ params }) => {
  const toast = useToast();
  const [task, setTask] = useState();
  const { projects, options } = useProjects();
  const router = useRouter();

  const { submit, change, errors, form } = useForm({
    initialValues: {
      project: undefined,
      title: "",
      description: "",
      startingAt: undefined,
      startedAt: undefined,
      deadline: AppDate.in(7).toString(),
      status: "scheduled",
      children: [],
    },
    validate: (values, { errors }) => {
      if (!values.project) {
        errors.set("project", "プロジェクトを設定してください");
      }

      if (!values.title) {
        errors.set("title", "タイトルを設定してください");
      }

      if (!values.deadline) {
        errors.set("deadline", "期限を設定してください");
      }

      return errors;
    },
    onSubmit: async (values) => {
      const { project, ...rest } = values;
      try {
        await api.updateTask(params.id, {
          ...rest,
          projectId: project?.id,
        });
        router.push("/");

        toast.success("タスクを更新しました。");
      } catch (e) {
        console.error(e);
        toast.error("タスクの更新に失敗しました。");
      }
    },
  });

  const updateFormWith = (task) => {
    change({
      project: task.project,
      parent: task.parent,
      title: task.title,
      description: task.description,
      deadline: task.deadline.format(),
      createdAt: task.createdAt?.format(),
      updatedAt: task.updatedAt?.format(),
      status: task.status,
    });
  };

  useEffect(() => {
    const init = async () => {
      const res = await api.fetchTask(params);
      const task = factory.task(res.data.data);
      setTask(task);
      updateFormWith(task);
    };

    init();
  }, []);

  const errorMessages = errors.object;
  if (!task) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <EditableField
              defaultValue={form.title}
              inputStyleClass={styles.titleField}
              onChangeEnd={(value) => {
                change({ title: value });
              }}
            />
          </h2>
          <div className={styles.subHeader}>
            <div className={styles.subHeaderColumn}>
              <div className={styles.label}>作成日時: {form.createdAt}</div>
            </div>
            <div className={styles.subHeaderColumn}>
              <div className={styles.label}>更新日時: {form.updatedAt}</div>
            </div>
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.field}>
            <div className={join(styles.label, styles.required)}>
              プロジェクト
            </div>
            <div className={styles.input}>
              <Select
                data={options}
                value={form.project?.id}
                defaultOption={{
                  label: "プログラムを選択してください",
                  value: "",
                }}
                onSelect={(option) => {
                  const project = projects.find((it) => it.id === option.value);
                  change({ project });
                }}
              />
              <ErrorMessage message={errorMessages.project} />
            </div>
          </div>
          <div className={styles.field}>
            <div className={join(styles.label, styles.required)}>締切日</div>
            <div className={styles.input}>
              <DateInput
                value={form.deadline}
                onChange={(e) => {
                  change({ deadline: e.target.value });
                }}
              />
              <ErrorMessage message={errorMessages.deadline} />
            </div>
          </div>
          <div className={styles.field}>
            <div className={join(styles.label, styles.status)}>ステータス</div>
            <div className={styles.input}>
              <Select
                data={statusOptions}
                value={form.status}
                defaultOption={{
                  label: "ステータスを選択してください",
                  value: "",
                }}
                onSelect={(option) => {
                  const status = selectableStatus.find(
                    (it) => it === option.value,
                  );
                  change({ status });
                }}
              />
            </div>
          </div>
          <div className={styles.field}>
            <div className={styles.label}>説明・メモ</div>
            <div className={styles.input}>
              <TextArea
                value={form.description}
                rows={5}
                placeholder="タスクの説明・メモ"
                onChange={(e) => {
                  change({ description: e.target.value });
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.buttons}>
            <Button
              variant="primary"
              onClick={() => {
                submit();
              }}>
              更新
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                if (!task) {
                  return;
                }
                updateFormWith(task);
              }}>
              リセット
            </Button>
          </div>
          <div className={styles.back}>
            <p onClick={() => router.back()} className={styles.backText}>
              <Icon name="back" />
              <Icon name="back" />
              戻る
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
